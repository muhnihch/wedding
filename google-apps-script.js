/**
 * Google Apps Script to receive form data and write to Google Sheet
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1Eqjq5ZLCRijHjilFpARHwA4mVAzeZL3ljCcHsWacMO4/edit
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code and paste this entire file
 * 4. Replace 'YOUR_SHEET_NAME' with your actual sheet name (usually 'Sheet1' or the first sheet)
 * 5. Click Save (floppy disk icon)
 * 6. Click Deploy > New deployment
 * 7. Select type: Web app
 * 8. Description: "Wedding RSVP Form Handler"
 * 9. Execute as: Me
 * 10. Who has access: Anyone (or Anyone with Google account)
 * 11. Click Deploy
 * 12. Copy the Web App URL and use it in script.js
 * 13. Click Authorize access when prompted
 */

function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the POST data
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      // If JSON parsing fails, try form-encoded data
      const params = e.parameter;
      data = {
        attendance: params.attendance || '',
        guestSide: params.guestSide || '',
        guestCount: params.guestCount || '',
        specialMessage: params.specialMessage || ''
      };
    }
    
    // Get current timestamp
    const timestamp = new Date();
    
    // Prepare row data matching your sheet columns:
    // Column A: Timestamp
    // Column B: will you be attending
    // Column C: Are you guest from
    // Column D: Guest count
    // Column E: Special message for the couple
    const rowData = [
      timestamp,
      data.attendance || '',
      data.guestSide || '',
      data.guestCount || '',
      data.specialMessage || ''
    ];
    
    // Append the row to the sheet
    sheet.appendRow(rowData);
    
    // Return success response (CORS is handled automatically by Google Apps Script when deployed as web app)
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Data saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: GET handler for testing
function doGet(e) {
  return ContentService
    .createTextOutput('Wedding RSVP Form Handler is running!')
    .setMimeType(ContentService.MimeType.TEXT);
}

