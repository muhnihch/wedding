# Google Apps Script Setup Instructions

## Step-by-Step Guide to Connect Form Directly to Google Sheet

### Step 1: Open Your Google Sheet
1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1Eqjq5ZLCRijHjilFpARHwA4mVAzeZL3ljCcHsWacMO4/edit
2. Your sheet should have these column headers in the first row (which it already does):
   - Column A: Timestamp
   - Column B: will you be attending
   - Column C: Are you guest from
   - Column D: Guest count
   - Column E: Special message for the couple
   
   The script will automatically append new rows with data matching these columns.

### Step 2: Create Google Apps Script
1. In your Google Sheet, click **Extensions** → **Apps Script**
2. A new tab will open with the Apps Script editor
3. Delete any existing code in the editor
4. Copy the entire contents of `google-apps-script.js` file
5. Paste it into the Apps Script editor
6. Click the **Save** icon (floppy disk) or press `Ctrl+S` / `Cmd+S`
7. Give your project a name (e.g., "Wedding RSVP Handler")

### Step 3: Deploy as Web App
1. Click **Deploy** → **New deployment**
2. Click the gear icon (⚙️) next to "Select type"
3. Choose **Web app**
4. Fill in the deployment settings:
   - **Description**: "Wedding RSVP Form Handler"
   - **Execute as**: Me (your email)
   - **Who has access**: **Anyone** (this allows your website to submit data)
5. Click **Deploy**
6. You may be prompted to authorize the script:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to [Project Name] (unsafe)**
   - Click **Allow**
7. After authorization, you'll see a **Web App URL**
8. **Copy this URL** - you'll need it in the next step

### Step 4: Update Your Website Code
1. Open `script.js` in your project
2. Find this line:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` with the Web App URL you copied
4. It should look like:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```
5. Save the file

### Step 5: Test the Form
1. Deploy your website with the updated code
2. Fill out the form on your website
3. Submit it
4. Check your Google Sheet - you should see a new row with the data!

## Troubleshooting

### Data not appearing in sheet?
- Make sure you selected "Anyone" for "Who has access" in deployment settings
- Check that the Web App URL in `script.js` is correct
- Open the Apps Script editor and check "Executions" tab for any errors

### Getting authorization errors?
- Make sure you clicked "Authorize access" when deploying
- Try redeploying and selecting "Anyone" for access

### Need to update the script?
- After making changes to the Apps Script code, you need to create a **new deployment** (not just save)
- Or update the existing deployment by clicking the pencil icon next to it

## Security Note
The script is set to allow "Anyone" to submit data, which is necessary for your public website. The script only writes data to your sheet - it doesn't read or modify existing data.

