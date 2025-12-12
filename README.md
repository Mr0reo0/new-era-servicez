# NEW ERA SERVICEZ - Startup Operating System

The platform that lets founders boot a complete company layer by layer.

## 🚀 Overview

New Era Servicez is a web platform that behaves like a **Startup Operating System**. Instead of giving founders templates or courses, it lets them boot the six layers of a company, preview everything in real time, and export a fully structured blueprint ready for execution.

## 🎯 Key Features

- **6-Layer Company Booting System**
  - Identity Layer (Worldview, Brand, Positioning)
  - Product Layer (Offers, Pricing, 10x Features)
  - Audience Layer (Growth Engine, Distribution)
  - Systems Layer (CRM, Automation, Workflows)
  - Financial Layer (Revenue Model, Projections)
  - Expansion Layer (Partnerships, Scale Map)

- **AI-Powered Content Generation** - VC-grade content for every layer
- **Google OAuth Authentication** - Secure user authentication
- **Command Centre Dashboard** - Track progress across all layers
- **Blueprint Export** - Export as PDF, JSON, or Notion
- **AI Mentor Hub** - Context-aware guidance and support

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router v6
- Tailwind CSS
- shadcn/ui (Radix UI primitives)
- Framer Motion
- Axios
- Sonner (Toast notifications)
- Lucide React (Icons)

### Backend
- FastAPI (Python)
- MongoDB (Motor async driver)
- Emergent AI Integration
- ReportLab (PDF generation)
- JWT Authentication

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- MongoDB (local or cloud)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file from example:
```bash
cp .env.example .env
```

5. Update `.env` with your credentials:
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=new_era_servicez
EMERGENT_LLM_KEY=your_key_here
JWT_SECRET=your_secret_here
```

6. Start the backend server:
```bash
uvicorn server:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
REACT_APP_API_URL=http://localhost:8000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

4. Start the development server:
```bash
npm start
```

The app will be available at `http://localhost:3000`

## 🎨 Design System

### Colors
- **Primary**: Graphite (#5E6366)
- **Accent**: Electric Cyan (#00CFFF)
- **Accent II**: Violet Fuse (#7A5CFF)
- **Background**: Porcelain (#F6F7F8)
- **Text**: Onyx (#0F1113)

### Typography
- **Headings**: Neue Haas Grotesk
- **Body**: Space Grotesk

## 📁 Project Structure

```
app/
├── backend/
│   ├── server.py           # FastAPI application
│   ├── requirements.txt    # Python dependencies
│   └── .env.example       # Environment variables template
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React contexts (Auth, Blueprint)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and API client
│   │   ├── pages/         # Page components
│   │   ├── styles/        # Global styles
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   ├── package.json
│   └── tailwind.config.js
└── design_guidelines.json  # Design system reference
```

## 🔑 Key Pages

1. **Home** (`/`) - Landing page with hero and layer preview
2. **Dashboard** (`/dashboard`) - Command centre with progress tracking
3. **Layers** (`/layers`) - Overview of all 6 layers
4. **Layer Detail** (`/layers/:layerId`) - Individual layer with AI generation
5. **Mentor Hub** (`/mentor`) - AI chat interface
6. **Blueprint Generator** (`/blueprint`) - Export functionality
7. **Pricing** (`/pricing`) - Pricing tiers
8. **Waitlist** (`/waitlist`) - Early access signup

## 🔐 Authentication

The app uses Google OAuth for authentication. Users must sign in to access protected routes like the dashboard and layer pages.

## 🤖 AI Integration

The platform uses Emergent AI for:
- Layer content generation
- Mentor chat responses
- Context-aware suggestions

## 📤 Export Options

Users can export their complete blueprint as:
- **PDF** - Formatted document with all layers
- **JSON** - Structured data for integrations
- **Notion** (Coming soon)
- **Webflow** (Coming soon)

## 🚧 Development

### Running Tests
```bash
# Backend
cd backend
pytest

# Frontend
cd frontend
npm test
```

### Building for Production
```bash
# Frontend
cd frontend
npm run build

# Backend
# Use a production ASGI server like Gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker server:app
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/google` - Google OAuth login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Blueprint
- `GET /api/blueprint` - Get user's blueprint
- `POST /api/blueprint` - Create/update blueprint
- `PUT /api/blueprint/layer/:layerId` - Update specific layer

### AI
- `POST /api/ai/generate-layer` - Generate layer content
- `POST /api/ai/mentor-chat` - Chat with AI mentor
- `GET /api/ai/chat-history` - Get chat history

### Export
- `GET /api/export/pdf` - Export as PDF
- `GET /api/export/json` - Export as JSON

### Waitlist
- `POST /api/waitlist` - Join waitlist

## 🎯 Roadmap

- [ ] Complete Google OAuth integration
- [ ] Implement all 6 layer detail pages
- [ ] Add Notion export
- [ ] Add Webflow export
- [ ] Build marketplace
- [ ] Add team collaboration features
- [ ] Mobile app

## 📄 License

Proprietary - All rights reserved

## 👥 Contact

For questions or support, contact: [Your contact information]

---

**Built with precision. Designed for category-defining founders.**
