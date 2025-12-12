# NEW ERA SERVICEZ - Complete Setup Guide

## Prerequisites Installation

### 1. Install Node.js and npm
Download and install Node.js 18+ from: https://nodejs.org/
This will also install npm automatically.

Verify installation:
```bash
node --version
npm --version
```

### 2. Install Python 3.9+
Download from: https://www.python.org/downloads/
Make sure to check "Add Python to PATH" during installation.

Verify installation:
```bash
python --version
pip --version
```

### 3. Install MongoDB
**Option A: Local Installation**
- Download from: https://www.mongodb.com/try/download/community
- Follow installation instructions for your OS

**Option B: MongoDB Atlas (Cloud)**
- Sign up at: https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get your connection string

## Step-by-Step Setup

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Create Python virtual environment:**
```bash
python -m venv venv
```

3. **Activate virtual environment:**
- Windows: `venv\Scripts\activate`
- Mac/Linux: `source venv/bin/activate`

4. **Install Python dependencies:**
```bash
pip install -r requirements.txt
```

5. **Create .env file:**
Copy `.env.example` to `.env` and fill in your credentials:
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=new_era_servicez
EMERGENT_LLM_KEY=your_emergent_key_here
JWT_SECRET=your_random_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
ENVIRONMENT=development
```

6. **Start the backend server:**
```bash
uvicorn server:app --reload --port 8000
```

Backend will run at: `http://localhost:8000`
API docs available at: `http://localhost:8000/docs`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install npm dependencies:**
```bash
npm install
```

This will install:
- React 18
- React Router v6
- Tailwind CSS
- shadcn/ui components
- Framer Motion
- Axios
- And all other dependencies

3. **Create .env file:**
Copy `.env.example` to `.env`:
```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

4. **Start the development server:**
```bash
npm start
```

Frontend will run at: `http://localhost:3000`

## Getting API Keys

### Emergent AI Key
1. Sign up at Emergent AI platform
2. Navigate to API settings
3. Generate a new API key
4. Add to backend `.env` file

### Google OAuth Credentials
1. Go to: https://console.cloud.google.com/
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Add authorized redirect URIs:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:8000/api/auth/google/callback`
6. Copy Client ID and Client Secret
7. Add to both frontend and backend `.env` files

## Troubleshooting

### Port Already in Use
If port 3000 or 8000 is already in use:
- Frontend: Set `PORT=3001` in frontend `.env`
- Backend: Use `--port 8001` flag when starting uvicorn

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod` (if local)
- Check connection string in `.env`
- For Atlas, ensure IP whitelist includes your IP

### npm Install Fails
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### Python Dependencies Fail
- Upgrade pip: `pip install --upgrade pip`
- Install build tools (Windows): Install Visual Studio Build Tools
- Try installing problematic packages individually

## Verification Checklist

- [ ] Node.js and npm installed
- [ ] Python and pip installed
- [ ] MongoDB running (local or Atlas)
- [ ] Backend virtual environment created and activated
- [ ] Backend dependencies installed
- [ ] Backend `.env` file configured
- [ ] Backend server running on port 8000
- [ ] Frontend dependencies installed
- [ ] Frontend `.env` file configured
- [ ] Frontend server running on port 3000
- [ ] Can access frontend at http://localhost:3000
- [ ] Can access backend API docs at http://localhost:8000/docs

## Quick Start Commands

### Start Backend
```bash
cd backend
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
uvicorn server:app --reload --port 8000
```

### Start Frontend
```bash
cd frontend
npm start
```

## Next Steps

1. **Test the Application:**
   - Visit http://localhost:3000
   - Navigate through the pages
   - Try the waitlist signup

2. **Configure Google OAuth:**
   - Set up Google OAuth credentials
   - Test login functionality

3. **Set up AI Integration:**
   - Get Emergent AI key
   - Test layer content generation
   - Test mentor chat

4. **Customize:**
   - Update branding
   - Modify content
   - Add custom features

## Production Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the 'build' folder
```

### Backend (Railway/Render/AWS)
- Set environment variables
- Use production ASGI server (Gunicorn)
- Configure MongoDB Atlas
- Set up domain and SSL

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review error logs
3. Check API documentation at `/docs`
4. Contact support team

---

**Ready to boot your startup? Let's go! 🚀**
