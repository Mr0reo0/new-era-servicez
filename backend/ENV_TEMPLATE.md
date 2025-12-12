# Backend Environment Variables

Create a `.env` file in the `backend` directory with these variables:

```env
# MongoDB Connection
MONGO_URL=your_mongodb_connection_string
DB_NAME=new_era_servicez

# OpenAI API (replaces Emergent AI)
OPENAI_API_KEY=your_openai_api_key

# JWT Secret (generate a random string)
JWT_SECRET=your_random_secret_key_here

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Environment
ENVIRONMENT=production
```

## How to Get Your API Keys:

### OpenAI API Key
1. Go to https://platform.openai.com
2. Sign up or log in
3. Go to API Keys section
4. Create new secret key
5. Copy and paste into OPENAI_API_KEY

### MongoDB Connection String
- If using Railway: Automatically provided when you add MongoDB service
- If using MongoDB Atlas: Get from your cluster's "Connect" button

### Google OAuth Credentials
1. Go to https://console.cloud.google.com
2. Create new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Copy Client ID and Client Secret
