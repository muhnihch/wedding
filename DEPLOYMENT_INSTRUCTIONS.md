# Google Apps Script Deployment Instructions

## IMPORTANT: Re-deploy the Script

The script has been updated with better error handling. You need to **re-deploy** it for the changes to take effect.

## Step-by-Step Deployment

### 1. Open Your Google Sheet
https://docs.google.com/spreadsheets/d/1Eqjq5ZLCRijHjilFpARHwA4mVAzeZL3ljCcHsWacMO4/edit

### 2. Open Apps Script Editor
- Click **Extensions** → **Apps Script**
- Or go directly to: https://script.google.com/home/projects

### 3. Update the Code
1. Delete ALL existing code in the editor
2. Copy the ENTIRE contents of `google-apps-script.js` from your project
3. Paste it into the Apps Script editor
4. Click **Save** (💾 icon) or press `Ctrl+S` / `Cmd+S`

### 4. Deploy as Web App

#### Option A: New Deployment (Recommended)
1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Fill in:
   - **Description**: "Wedding RSVP Form Handler v2"
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone** (important!)
5. Click **Deploy**
6. **Copy the new Web App URL** (you'll need this!)
7. Click **Authorize access** when prompted
8. Click **Advanced** → **Go to [project name] (unsafe)**
9. Click **Allow**

#### Option B: Update Existing Deployment
1. Click **Deploy** → **Manage deployments**
2. Find your existing deployment
3. Click the pencil icon ✏️ to edit
4. Click **New version** (to update the code)
5. Make sure:
   - **Execute as**: Me
   - **Who has access**: Anyone
6. Click **Deploy**
7. **Copy the updated URL** if it changed

### 5. Update script.js with New URL
1. Open `script.js` in your project
2. Find line 422: `const GOOGLE_SCRIPT_URL = '...'`
3. Replace the URL with the NEW URL from step 4
4. Save the file

### 6. Test the Deployment
1. Visit the Web App URL in your browser (should show: "Wedding RSVP Form Handler is running!")
2. Submit a test form on your website
3. Check your Google Sheet - data should appear within a few seconds

### 7. Check Execution Logs (if issues persist)
1. In Apps Script editor, click **Executions** (clock icon ⏰)
2. You should see recent execution logs
3. Click on any execution to see logs and errors
4. Look for the Logger.log messages to debug

## Common Issues

### Issue: "Script function not found"
- **Solution**: Make sure you saved the code before deploying

### Issue: "You do not have permission"
- **Solution**: Make sure "Who has access" is set to **Anyone**

### Issue: Data not appearing in sheet
- **Solution**: 
  1. Check execution logs for errors
  2. Verify the sheet ID is correct in the script
  3. Make sure you have edit access to the sheet

### Issue: 405 Method Not Allowed
- **Solution**: Re-deploy the script (the code has been updated)

## Verification Checklist

- [ ] Code is saved in Apps Script editor
- [ ] Script is deployed as Web App
- [ ] "Who has access" is set to "Anyone"
- [ ] New URL is copied and updated in script.js
- [ ] GET request to URL shows "Wedding RSVP Form Handler is running!"
- [ ] Test form submission works
- [ ] Data appears in Google Sheet

## Need Help?

1. Check the **Executions** tab in Apps Script for error logs
2. Check browser console (F12) for JavaScript errors
3. Verify the Web App URL is correct in script.js
4. Make sure the sheet is accessible and editable

