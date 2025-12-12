from fastapi import FastAPI, APIRouter, HTTPException, Response, Request, Depends
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone, timedelta
import httpx
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
import openai

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# OpenAI API Key
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY', '')
openai.api_key = OPENAI_API_KEY

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# ============== MODELS ==============

class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    user_id: str
    email: str
    name: str
    picture: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserSession(BaseModel):
    model_config = ConfigDict(extra="ignore")
    user_id: str
    session_token: str
    expires_at: datetime
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class LayerProgress(BaseModel):
    model_config = ConfigDict(extra="ignore")
    layer_id: str
    layer_name: str
    status: str = "not_started"  # not_started, in_progress, completed
    progress_percent: int = 0
    content: Dict[str, Any] = {}
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserBlueprint(BaseModel):
    model_config = ConfigDict(extra="ignore")
    blueprint_id: str = Field(default_factory=lambda: f"bp_{uuid.uuid4().hex[:12]}")
    user_id: str
    company_name: str = ""
    layers: List[LayerProgress] = []
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class WaitlistEntry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    entry_id: str = Field(default_factory=lambda: f"wl_{uuid.uuid4().hex[:12]}")
    email: str
    name: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ChatMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    message_id: str = Field(default_factory=lambda: f"msg_{uuid.uuid4().hex[:12]}")
    user_id: str
    role: str  # user or assistant
    content: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# ============== REQUEST/RESPONSE MODELS ==============

class WaitlistRequest(BaseModel):
    email: str
    name: Optional[str] = None

class LayerContentRequest(BaseModel):
    layer_id: str
    prompt: str
    company_name: Optional[str] = ""

class LayerUpdateRequest(BaseModel):
    layer_id: str
    content: Dict[str, Any]
    status: Optional[str] = None

class ChatRequest(BaseModel):
    message: str
    context: Optional[str] = None

class BlueprintCreateRequest(BaseModel):
    company_name: str

# ============== AUTH HELPERS ==============

async def get_current_user(request: Request) -> Optional[User]:
    session_token = request.cookies.get("session_token")
    if not session_token:
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            session_token = auth_header.split(" ")[1]
    
    if not session_token:
        return None
    
    session_doc = await db.user_sessions.find_one({"session_token": session_token}, {"_id": 0})
    if not session_doc:
        return None
    
    expires_at = session_doc["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):
        return None
    
    user_doc = await db.users.find_one({"user_id": session_doc["user_id"]}, {"_id": 0})
    if not user_doc:
        return None
    
    return User(**user_doc)

async def require_auth(request: Request) -> User:
    user = await get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user

# ============== AUTH ENDPOINTS ==============

@api_router.post("/auth/session")
async def process_session(request: Request, response: Response):
    session_id = request.headers.get("X-Session-ID")
    if not session_id:
        raise HTTPException(status_code=400, detail="Missing session ID")
    
    async with httpx.AsyncClient() as client_http:
        resp = await client_http.get(
            "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
            headers={"X-Session-ID": session_id}
        )
        if resp.status_code != 200:
            raise HTTPException(status_code=401, detail="Invalid session")
        data = resp.json()
    
    user_id = f"user_{uuid.uuid4().hex[:12]}"
    existing_user = await db.users.find_one({"email": data["email"]}, {"_id": 0})
    
    if existing_user:
        user_id = existing_user["user_id"]
        await db.users.update_one(
            {"user_id": user_id},
            {"$set": {"name": data["name"], "picture": data.get("picture")}}
        )
    else:
        user_doc = {
            "user_id": user_id,
            "email": data["email"],
            "name": data["name"],
            "picture": data.get("picture"),
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.users.insert_one(user_doc)
        
        # Create initial blueprint for new user
        default_layers = [
            {"layer_id": "identity", "layer_name": "Identity Layer", "status": "not_started", "progress_percent": 0, "content": {}},
            {"layer_id": "product", "layer_name": "Product Layer", "status": "not_started", "progress_percent": 0, "content": {}},
            {"layer_id": "audience", "layer_name": "Audience Layer", "status": "not_started", "progress_percent": 0, "content": {}},
            {"layer_id": "systems", "layer_name": "Systems Layer", "status": "not_started", "progress_percent": 0, "content": {}},
            {"layer_id": "financial", "layer_name": "Financial Layer", "status": "not_started", "progress_percent": 0, "content": {}},
            {"layer_id": "expansion", "layer_name": "Expansion Layer", "status": "not_started", "progress_percent": 0, "content": {}}
        ]
        blueprint_doc = {
            "blueprint_id": f"bp_{uuid.uuid4().hex[:12]}",
            "user_id": user_id,
            "company_name": "",
            "layers": default_layers,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
        await db.blueprints.insert_one(blueprint_doc)
    
    session_token = data.get("session_token", f"st_{uuid.uuid4().hex}")
    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    
    await db.user_sessions.delete_many({"user_id": user_id})
    session_doc = {
        "user_id": user_id,
        "session_token": session_token,
        "expires_at": expires_at.isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.user_sessions.insert_one(session_doc)
    
    response.set_cookie(
        key="session_token",
        value=session_token,
        httponly=True,
        secure=True,
        samesite="none",
        path="/",
        max_age=7*24*60*60
    )
    
    user_doc = await db.users.find_one({"user_id": user_id}, {"_id": 0})
    return {"user": user_doc, "session_token": session_token}

@api_router.get("/auth/me")
async def get_me(request: Request):
    user = await get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user.model_dump()

@api_router.post("/auth/logout")
async def logout(request: Request, response: Response):
    session_token = request.cookies.get("session_token")
    if session_token:
        await db.user_sessions.delete_many({"session_token": session_token})
    response.delete_cookie(key="session_token", path="/")
    return {"message": "Logged out"}

# ============== BLUEPRINT ENDPOINTS ==============

@api_router.get("/blueprint")
async def get_blueprint(request: Request):
    user = await require_auth(request)
    blueprint = await db.blueprints.find_one({"user_id": user.user_id}, {"_id": 0})
    if not blueprint:
        default_layers = [
            {"layer_id": "identity", "layer_name": "Identity Layer", "status": "not_started", "progress_percent": 0, "content": {}},
            {"layer_id": "product", "layer_name": "Product Layer", "status": "not_started", "progress_percent": 0, "content": {}},
            {"layer_id": "audience", "layer_name": "Audience Layer", "status": "not_started", "progress_percent": 0, "content": {}},
            {"layer_id": "systems", "layer_name": "Systems Layer", "status": "not_started", "progress_percent": 0, "content": {}},
            {"layer_id": "financial", "layer_name": "Financial Layer", "status": "not_started", "progress_percent": 0, "content": {}},
            {"layer_id": "expansion", "layer_name": "Expansion Layer", "status": "not_started", "progress_percent": 0, "content": {}}
        ]
        blueprint = {
            "blueprint_id": f"bp_{uuid.uuid4().hex[:12]}",
            "user_id": user.user_id,
            "company_name": "",
            "layers": default_layers,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
        await db.blueprints.insert_one(blueprint)
        del blueprint["_id"] if "_id" in blueprint else None
    return blueprint

@api_router.put("/blueprint/company-name")
async def update_company_name(request: Request, data: BlueprintCreateRequest):
    user = await require_auth(request)
    await db.blueprints.update_one(
        {"user_id": user.user_id},
        {"$set": {"company_name": data.company_name, "updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    return {"message": "Company name updated"}

@api_router.put("/blueprint/layer")
async def update_layer(request: Request, data: LayerUpdateRequest):
    user = await require_auth(request)
    blueprint = await db.blueprints.find_one({"user_id": user.user_id}, {"_id": 0})
    if not blueprint:
        raise HTTPException(status_code=404, detail="Blueprint not found")
    
    layers = blueprint.get("layers", [])
    for layer in layers:
        if layer["layer_id"] == data.layer_id:
            layer["content"] = data.content
            if data.status:
                layer["status"] = data.status
            # Calculate progress based on content fields
            content_fields = len([v for v in data.content.values() if v])
            layer["progress_percent"] = min(100, content_fields * 20)
            if layer["progress_percent"] == 100:
                layer["status"] = "completed"
            elif layer["progress_percent"] > 0:
                layer["status"] = "in_progress"
            layer["updated_at"] = datetime.now(timezone.utc).isoformat()
            break
    
    await db.blueprints.update_one(
        {"user_id": user.user_id},
        {"$set": {"layers": layers, "updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    return {"message": "Layer updated", "layers": layers}

# ============== AI CONTENT GENERATION ==============

@api_router.post("/generate/layer-content")
async def generate_layer_content(request: Request, data: LayerContentRequest):
    user = await require_auth(request)
    
    layer_prompts = {
        "identity": f"""Generate startup identity content for {data.company_name or 'a startup'}:
- Worldview: A unique perspective on the market (2-3 sentences)
- Category POV: How this startup sees its category differently (2-3 sentences)
- Brand Archetype: The personality type (e.g., The Innovator, The Sage, etc.)
- Core Message: A powerful tagline or positioning statement
- Values: 3-5 core values

User context: {data.prompt}

Return as JSON with keys: worldview, category_pov, brand_archetype, core_message, values (array)""",
        
        "product": f"""Generate product strategy content for {data.company_name or 'a startup'}:
- Main Offer: The core product/service description
- Pricing Strategy: Recommended pricing approach
- 10x Feature: The one feature that makes this 10x better than alternatives
- Signature Experience: What makes the customer experience unique

User context: {data.prompt}

Return as JSON with keys: main_offer, pricing_strategy, ten_x_feature, signature_experience""",
        
        "audience": f"""Generate audience growth strategy for {data.company_name or 'a startup'}:
- Target Audience: Detailed description of ideal customer
- Distribution Channels: Top 3 channels to reach them
- Content Strategy: Content pillars and approach
- Growth Engine: The primary growth mechanism

User context: {data.prompt}

Return as JSON with keys: target_audience, distribution_channels (array), content_strategy, growth_engine""",
        
        "systems": f"""Generate operational systems for {data.company_name or 'a startup'}:
- CRM Approach: How to manage customer relationships
- Automation Priorities: Top 3 processes to automate
- Key Workflows: Essential business workflows
- Tech Stack Recommendations: Core tools needed

User context: {data.prompt}

Return as JSON with keys: crm_approach, automation_priorities (array), key_workflows (array), tech_stack (array)""",
        
        "financial": f"""Generate financial strategy for {data.company_name or 'a startup'}:
- Revenue Model: How the business makes money
- Pricing Tiers: Recommended tier structure
- Key Metrics: Top 5 metrics to track
- Financial Projections: High-level growth scenarios

User context: {data.prompt}

Return as JSON with keys: revenue_model, pricing_tiers (array of objects with name and price), key_metrics (array), financial_projections""",
        
        "expansion": f"""Generate expansion strategy for {data.company_name or 'a startup'}:
- Partnership Opportunities: Types of strategic partners
- Ecosystem Vision: How to build an ecosystem
- Scale Map: Phases of scaling
- Category Leadership: How to become the category leader

User context: {data.prompt}

Return as JSON with keys: partnership_opportunities (array), ecosystem_vision, scale_map (array), category_leadership"""
    }
    
    prompt = layer_prompts.get(data.layer_id, data.prompt)
    
    try:
        response = await openai.ChatCompletion.acreate(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a startup strategy expert. Generate practical, actionable content. Always respond with valid JSON only, no markdown or explanation."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=1500
        )
        
        response_text = response.choices[0].message.content
        
        # Try to parse as JSON
        import json
        try:
            content = json.loads(response_text)
        except:
            content = {"raw_content": response_text}
        
        return {"content": content}
    except Exception as e:
        logger.error(f"AI generation error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ============== AI MENTOR CHAT ==============

@api_router.post("/chat/mentor")
async def mentor_chat(request: Request, data: ChatRequest):
    user = await require_auth(request)
    
    # Save user message
    user_msg = {
        "message_id": f"msg_{uuid.uuid4().hex[:12]}",
        "user_id": user.user_id,
        "role": "user",
        "content": data.message,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.chat_messages.insert_one(user_msg)
    
    # Get chat history for context
    history = await db.chat_messages.find(
        {"user_id": user.user_id},
        {"_id": 0}
    ).sort("created_at", -1).limit(10).to_list(10)
    history.reverse()
    
    history_text = "\n".join([f"{m['role']}: {m['content']}" for m in history[:-1]])
    
    try:
        full_prompt = f"""Previous conversation:
{history_text}

User's current question: {data.message}

{f"Business context: {data.context}" if data.context else ""}"""
        
        response = await openai.ChatCompletion.acreate(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": """You are an expert startup mentor and advisor for New Era Servicez - a Startup Operating System.
You help founders with:
- Strategy and positioning
- Product development
- Growth and marketing
- Operations and systems
- Fundraising and finance
- Scaling and expansion

Be concise, practical, and actionable. Draw from best practices of successful startups.
If relevant context about their business is provided, reference it in your advice."""},
                {"role": "user", "content": full_prompt}
            ],
            temperature=0.7,
            max_tokens=1000
        )
        
        response_text = response.choices[0].message.content
        
        # Save assistant response
        assistant_msg = {
            "message_id": f"msg_{uuid.uuid4().hex[:12]}",
            "user_id": user.user_id,
            "role": "assistant",
            "content": response_text,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.chat_messages.insert_one(assistant_msg)
        
        return {"response": response_text}
    except Exception as e:
        logger.error(f"Mentor chat error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/chat/history")
async def get_chat_history(request: Request):
    user = await require_auth(request)
    messages = await db.chat_messages.find(
        {"user_id": user.user_id},
        {"_id": 0}
    ).sort("created_at", 1).to_list(100)
    return {"messages": messages}

# ============== EXPORT ENDPOINTS ==============

@api_router.get("/export/pdf")
async def export_pdf(request: Request):
    user = await require_auth(request)
    blueprint = await db.blueprints.find_one({"user_id": user.user_id}, {"_id": 0})
    if not blueprint:
        raise HTTPException(status_code=404, detail="Blueprint not found")
    
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter, topMargin=50, bottomMargin=50)
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle('Title', parent=styles['Title'], fontSize=24, spaceAfter=30, textColor=colors.HexColor('#0F1113'))
    heading_style = ParagraphStyle('Heading', parent=styles['Heading1'], fontSize=16, spaceAfter=12, textColor=colors.HexColor('#00CFFF'))
    body_style = ParagraphStyle('Body', parent=styles['Normal'], fontSize=11, spaceAfter=8, textColor=colors.HexColor('#5E6366'))
    
    story = []
    
    # Title
    company_name = blueprint.get("company_name") or "Your Startup"
    story.append(Paragraph(f"{company_name} - Startup Blueprint", title_style))
    story.append(Paragraph(f"Generated by New Era Servicez", body_style))
    story.append(Spacer(1, 30))
    
    # Layers
    for layer in blueprint.get("layers", []):
        story.append(Paragraph(f"Layer: {layer['layer_name']}", heading_style))
        story.append(Paragraph(f"Status: {layer['status'].replace('_', ' ').title()} ({layer['progress_percent']}% complete)", body_style))
        
        content = layer.get("content", {})
        if content:
            for key, value in content.items():
                if value:
                    formatted_key = key.replace("_", " ").title()
                    if isinstance(value, list):
                        value_str = ", ".join([str(v) if not isinstance(v, dict) else str(v) for v in value])
                    else:
                        value_str = str(value)
                    story.append(Paragraph(f"<b>{formatted_key}:</b> {value_str}", body_style))
        
        story.append(Spacer(1, 20))
    
    doc.build(story)
    buffer.seek(0)
    
    return StreamingResponse(
        buffer,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename={company_name.replace(' ', '_')}_blueprint.pdf"}
    )

@api_router.get("/export/json")
async def export_json(request: Request):
    user = await require_auth(request)
    blueprint = await db.blueprints.find_one({"user_id": user.user_id}, {"_id": 0})
    if not blueprint:
        raise HTTPException(status_code=404, detail="Blueprint not found")
    return blueprint

# ============== WAITLIST ENDPOINTS ==============

@api_router.post("/waitlist")
async def join_waitlist(data: WaitlistRequest):
    existing = await db.waitlist.find_one({"email": data.email}, {"_id": 0})
    if existing:
        return {"message": "Already on waitlist", "entry": existing}
    
    entry = {
        "entry_id": f"wl_{uuid.uuid4().hex[:12]}",
        "email": data.email,
        "name": data.name,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.waitlist.insert_one(entry)
    del entry["_id"] if "_id" in entry else None
    return {"message": "Successfully joined waitlist", "entry": entry}

# ============== HEALTH CHECK ==============

@api_router.get("/")
async def root():
    return {"message": "New Era Servicez API", "status": "operational"}

@api_router.get("/health")
async def health():
    return {"status": "healthy"}

# Include router and middleware
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
