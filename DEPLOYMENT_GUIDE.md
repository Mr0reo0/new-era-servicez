# NEW ERA SERVICEZ - One-Click Deployment Guide

Deploy your application online without any local setup using these platforms that handle everything automatically.

## 🚀 Recommended: Deploy to Vercel + Railway (Easiest)

This combination is **completely free** and requires **zero local setup**.

### Step 1: Deploy Frontend to Vercel (2 minutes)

**Vercel** automatically builds and deploys React apps from GitHub.

1. **Push code to GitHub:**
   - Create a new repository on GitHub
   - Push this project to GitHub

2. **Deploy to Vercel:**
   - Go to https://vercel.com
   - Click "Sign Up" (use GitHub account)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure:
     - **Framework Preset:** Create React App
     - **Root Directory:** `frontend`
     - **Build Command:** `npm run build`
     - **Output Directory:** `build`
   - Add Environment Variables:
     ```
     REACT_APP_API_URL=https://your-backend-url.railway.app
     REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
     ```
   - Click "Deploy"

**Done!** Your frontend will be live at `https://your-app.vercel.app`

### Step 2: Deploy Backend to Railway (3 minutes)

**Railway** automatically deploys Python apps with MongoDB included.

1. **Go to Railway:**
   - Visit https://railway.app
   - Click "Start a New Project"
   - Sign in with GitHub

2. **Deploy from GitHub:**
   - Click "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect Python

3. **Add MongoDB:**
   - Click "New" → "Database" → "Add MongoDB"
   - Railway will automatically create a MongoDB instance
   - Copy the `MONGO_URL` from the MongoDB service

4. **Configure Backend:**
   - Click on your backend service
   - Go to "Variables" tab
   - Add these environment variables:
     ```
     MONGO_URL=mongodb://mongo:password@containers-us-west-xxx.railway.app:port
     DB_NAME=new_era_servicez
     EMERGENT_LLM_KEY=your_emergent_key
     JWT_SECRET=your_random_secret_key
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     ENVIRONMENT=production
     ```
   - Go to "Settings" tab
   - Set **Root Directory:** `backend`
   - Set **Start Command:** `uvicorn server:app --host 0.0.0.0 --port $PORT`

5. **Deploy:**
   - Railway will automatically deploy
   - Your API will be live at `https://your-app.railway.app`

6. **Update Frontend:**
   - Go back to Vercel
   - Update `REACT_APP_API_URL` with your Railway URL
   - Redeploy

**Done!** Your full application is now live online!

---

## 🌐 Alternative: Deploy to Netlify + Render

### Frontend on Netlify

1. Go to https://netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repo
4. Configure:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/build`
5. Add environment variables in Netlify dashboard
6. Deploy!

### Backend on Render

1. Go to https://render.com
2. Click "New" → "Web Service"
3. Connect GitHub repository
4. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn server:app --host 0.0.0.0 --port $PORT`
5. Add environment variables
6. Add MongoDB (Render has built-in MongoDB)
7. Deploy!

---

## 🔥 Super Easy: Deploy to Replit (All-in-One)

**Replit** runs everything in the browser - no local setup needed!

1. **Go to Replit:**
   - Visit https://replit.com
   - Sign up/Login

2. **Import from GitHub:**
   - Click "Create Repl"
   - Select "Import from GitHub"
   - Paste your repository URL
   - Replit will auto-detect the project

3. **Configure:**
   - Replit will automatically install dependencies
   - Add environment variables in "Secrets" tab
   - Run the backend and frontend in split terminals

4. **Deploy:**
   - Click "Deploy" button
   - Your app will be live instantly!

**Pros:** Everything in browser, no local setup
**Cons:** Free tier has limitations

---

## 📱 Deploy to Heroku (Classic Option)

### Frontend + Backend Together

1. **Install Heroku CLI** (or use web dashboard)
2. **Create Heroku App:**
   ```bash
   heroku create your-app-name
   ```

3. **Add Buildpacks:**
   ```bash
   heroku buildpacks:add heroku/nodejs
   heroku buildpacks:add heroku/python
   ```

4. **Add MongoDB:**
   ```bash
   heroku addons:create mongolab:sandbox
   ```

5. **Set Environment Variables:**
   ```bash
   heroku config:set EMERGENT_LLM_KEY=your_key
   heroku config:set JWT_SECRET=your_secret
   ```

6. **Deploy:**
   ```bash
   git push heroku main
   ```

---

## 🎯 Recommended Setup for You

**Best Option: Vercel + Railway**

**Why?**
- ✅ Completely free
- ✅ Zero local setup required
- ✅ Automatic deployments from GitHub
- ✅ Built-in MongoDB
- ✅ SSL certificates included
- ✅ Global CDN
- ✅ Easy to manage

**Time to Deploy:** 5-10 minutes total

---

## 📋 Pre-Deployment Checklist

Before deploying, make sure you have:

- [ ] GitHub account
- [ ] Code pushed to GitHub repository
- [ ] Emergent AI API key
- [ ] Google OAuth credentials (Client ID & Secret)
- [ ] MongoDB connection string (or use Railway's built-in)

---

## 🔐 Getting Required Credentials

### Emergent AI Key
1. Sign up at Emergent AI platform
2. Go to API settings
3. Generate new API key

### Google OAuth
1. Go to https://console.cloud.google.com
2. Create new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `https://your-app.vercel.app/auth/callback`
   - `https://your-backend.railway.app/api/auth/google/callback`

---

## 🎉 After Deployment

Once deployed, your app will be accessible at:
- **Frontend:** `https://your-app.vercel.app`
- **Backend API:** `https://your-backend.railway.app`
- **API Docs:** `https://your-backend.railway.app/docs`

Test the application:
1. Visit your frontend URL
2. Navigate through pages
3. Sign up for waitlist
4. Test Google OAuth login
5. Try AI generation features

---

## 💡 Pro Tips

1. **Use Railway for Backend** - It's the easiest with built-in MongoDB
2. **Use Vercel for Frontend** - Best for React apps, automatic deployments
3. **Connect GitHub** - Automatic deployments on every push
4. **Monitor Logs** - Both platforms have excellent logging
5. **Scale Later** - Start free, upgrade as you grow

---

## 🆘 Troubleshooting

**Build Fails on Vercel:**
- Check that `frontend` is set as root directory
- Verify all dependencies are in `package.json`

**Backend Won't Start on Railway:**
- Verify environment variables are set
- Check MongoDB connection string
- Review logs in Railway dashboard

**CORS Errors:**
- Update CORS settings in `backend/server.py`
- Add your Vercel URL to allowed origins

---

## 📞 Need Help?

If you encounter issues:
1. Check platform documentation (Vercel/Railway)
2. Review deployment logs
3. Verify environment variables
4. Test API endpoints at `/docs`

**Ready to deploy? Start with Vercel + Railway - it's the easiest path! 🚀**
