# Troubleshooting Google Apps Script Form Submission

## Common Issues and Solutions

### Issue 1: Form submits but data doesn't appear in Google Sheet

**Possible causes:**
1. Google Apps Script not deployed as Web App
2. Wrong sheet name in the script
3. Permissions not set correctly

**Solution:**
1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1Eqjq5ZLCRijHjilFpARHwA4mVAzeZL3ljCcHsWacMO4/edit
2. Go to **Extensions > Apps Script**
3. Make sure the code in `google-apps-script.js` is pasted
4. Click **Deploy > New deployment**
5. Select type: **Web app**
6. Set:
   - **Execute as**: Me
   - **Who has access**: Anyone (or "Anyone with Google account")
7. Click **Deploy**
8. Copy the new Web App URL
9. Update the URL in `script.js` line 422

### Issue 2: "Access denied" or permission errors

**Solution:**
1. When you first deploy, Google will ask for authorization
2. Click **Authorize access**
3. Choose your Google account
4. Click **Advanced** > **Go to [project name] (unsafe)**
5. Click **Allow**

### Issue 3: Sheet name mismatch

**Solution:**
1. Check your Google Sheet tab name
2. The script looks for "Form responses" first, then uses the active sheet
3. If your sheet has a different name, update line 28 in `google-apps-script.js`:
   ```javascript
   sheet = spreadsheet.getSheetByName('YOUR_SHEET_NAME');
   ```

### Issue 4: Data appears in wrong columns

**Solution:**
1. Make sure your Google Sheet has these columns in order:
   - Column A: Timestamp
   - Column B: will you be attending
   - Column C: Are you guest from
   - Column D: Guest count
   - Column E: Special message for the couple
2. If columns are different, update the `rowData` array in `google-apps-script.js` (lines 79-85)

### Issue 5: Form shows success but nothing happens

**Solution:**
1. Check browser console (F12) for errors
2. Test the Google Apps Script URL directly:
   - Open: https://script.google.com/macros/s/AKfycbxaXM3I5tzS27Q-7QbsEBnD2Ubrpb_KC6oBqAPQRCFQqXtvaXJcTSa5xGaZZ8DpHuscTA/exec
   - Should show: "Wedding RSVP Form Handler is running!"
3. Check Apps Script execution logs:
   - Go to Apps Script editor
   - Click **Executions** (clock icon) to see if requests are being received
   - Check for any error messages

### Issue 6: Mobile form not working

**Solution:**
1. The form uses `fetch` with `no-cors` mode
2. This works on all devices but you can't read the response
3. The form assumes success if the request is sent
4. Check your Google Sheet to verify data is actually being saved

## Testing the Setup

### Test 1: Check Google Apps Script is running
Visit: https://script.google.com/macros/s/AKfycbxaXM3I5tzS27Q-7QbsEBnD2Ubrpb_KC6oBqAPQRCFQqXtvaXJcTSa5xGaZZ8DpHuscTA/exec

Should show: "Wedding RSVP Form Handler is running!"

### Test 2: Submit a test form
1. Fill out the form on your website
2. Submit it
3. Check your Google Sheet immediately
4. Data should appear within a few seconds

### Test 3: Check Apps Script logs
1. Go to Apps Script editor
2. Click **Executions** tab
3. You should see recent execution logs
4. Check for any errors

## Alternative: Use Google Forms Directly

If Google Apps Script continues to have issues, you can:
1. Create a Google Form
2. Link it to your Google Sheet
3. Embed the Google Form in your website using an iframe

## Need More Help?

1. Check the browser console (F12) for JavaScript errors
2. Check Apps Script execution logs
3. Verify the Google Sheet has the correct column headers
4. Make sure the Web App is deployed with "Anyone" access

