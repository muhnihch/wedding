# Google Sheets API Setup - Complete Guide

## Overview
This setup uses Google Sheets API v4 directly via a backend server. This gives you full control and unlimited submissions.

## Prerequisites
- Node.js installed
- Google Cloud account
- Your Google Sheet ID: `1Eqjq5ZLCRijHjilFpARHwA4mVAzeZL3ljCcHsWacMO4`

## Step 1: Set Up Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable **Google Sheets API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

## Step 2: Create Service Account

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Name it (e.g., "wedding-form-service")
4. Click "Create and Continue"
5. Skip role assignment, click "Done"
6. Click on the created service account
7. Go to "Keys" tab → "Add Key" → "Create new key"
8. Choose JSON format
9. Download the JSON file (keep it secure!)

## Step 3: Share Sheet with Service Account

1. Open your Google Sheet
2. Click "Share" button
3. Add the service account email (from the JSON file, field: `client_email`)
4. Give it "Editor" permission
5. Click "Send"

## Step 4: Set Up Backend Server

1. Install dependencies:
   ```bash
   npm install express googleapis
   ```

2. Place your service account JSON file in the project root as `service-account-key.json`

3. Update `sheets-api-backend.js` with your sheet ID (already set)

4. Run the server:
   ```bash
   node sheets-api-backend.js
   ```

5. Server will run on `http://localhost:3000`

## Step 5: Deploy Backend (Choose One)

### Option A: Deploy to Heroku (Free tier available)
1. Create `Procfile`: `web: node sheets-api-backend.js`
2. Set environment variables in Heroku dashboard
3. Deploy: `git push heroku main`

### Option B: Deploy to Railway/Render/Fly.io
- Similar process, set environment variables
- Point to your service account JSON file

### Option C: Use Vercel/Netlify Functions
- Convert to serverless function
- Store service account JSON as environment variable

## Step 6: Update Frontend

Update `script.js` to point to your backend URL:

```javascript
const BACKEND_URL = 'https://your-backend-url.com/api/submit';
```

Then use fetch to POST data:

```javascript
fetch(BACKEND_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    attendance: attendance,
    guestSide: guestSide,
    guestCount: guestCount,
    specialMessage: specialMessage
  })
})
```

## Alternative: Simpler Solution

**Actually, your Google Apps Script IS already an HTTP endpoint!**

The URL `https://script.google.com/macros/s/AKfycbxaXM3I5tzS27Q-7QbsEBnD2Ubrpb_KC6oBqAPQRCFQqXtvaXJcTSa5xGaZZ8DpHuscTA/exec` 
accepts standard HTTP POST requests with form data.

This is simpler than setting up Sheets API because:
- ✅ No backend server needed
- ✅ No API keys to manage
- ✅ No service accounts
- ✅ Already deployed and working
- ✅ Unlimited submissions

**Recommendation**: Fix the current Google Apps Script setup instead of switching to Sheets API.

