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
    // Log the request for debugging
    Logger.log('Received POST request');
    Logger.log('Parameters: ' + JSON.stringify(e.parameter));
    Logger.log('PostData: ' + JSON.stringify(e.postData));
    
    // Get the spreadsheet by ID (more reliable)
    const SPREADSHEET_ID = '1Eqjq5ZLCRijHjilFpARHwA4mVAzeZL3ljCcHsWacMO4';
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Try to get the active sheet (first sheet)
    let sheet = spreadsheet.getActiveSheet();
    
    // Log sheet name for debugging
    Logger.log('Using sheet: ' + sheet.getName());
    
    // Parse the POST data - handle form-encoded data
    let data = {};
    
    // Google Apps Script receives form data in e.parameter
    if (e.parameter) {
      data = {
        attendance: e.parameter.attendance || '',
        guestSide: e.parameter.guestSide || '',
        guestCount: e.parameter.guestCount || '',
        specialMessage: e.parameter.specialMessage || ''
      };
    } else if (e.postData && e.postData.contents) {
      // Try JSON if available
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseError) {
        Logger.log('Error parsing JSON: ' + parseError.toString());
        throw new Error('Failed to parse request data');
      }
    } else {
      throw new Error('No data received in request');
    }
    
    // Log the parsed data
    Logger.log('Parsed data: ' + JSON.stringify(data));
    
    // Validate required fields
    if (!data.attendance || !data.guestSide || !data.guestCount) {
      throw new Error('Missing required fields');
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
    
    // Log before appending
    Logger.log('Appending row: ' + JSON.stringify(rowData));
    
    // Append the row to the sheet
    sheet.appendRow(rowData);
    
    Logger.log('Row appended successfully');
    
    // Return success response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Data saved successfully',
        'timestamp': timestamp.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log the error
    Logger.log('Error: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
    
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

