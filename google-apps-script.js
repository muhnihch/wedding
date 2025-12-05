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
    // Get the spreadsheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Try to get "Form responses" sheet, or fall back to active sheet
    let sheet;
    try {
      sheet = spreadsheet.getSheetByName('Form responses');
      if (!sheet) {
        // If "Form responses" doesn't exist, use the active sheet
        sheet = spreadsheet.getActiveSheet();
      }
    } catch (e) {
      // Fallback to active sheet if there's any error
      sheet = spreadsheet.getActiveSheet();
    }
    
    // Parse the POST data - handle both JSON and form-encoded
    let data;
    try {
      if (e.postData && e.postData.contents) {
        data = JSON.parse(e.postData.contents);
      } else if (e.parameter) {
        // Form-encoded data
        data = {
          attendance: e.parameter.attendance || '',
          guestSide: e.parameter.guestSide || '',
          guestCount: e.parameter.guestCount || '',
          specialMessage: e.parameter.specialMessage || ''
        };
      } else {
        throw new Error('No data received');
      }
    } catch (parseError) {
      // Log error for debugging
      console.error('Error parsing data:', parseError);
      // Try to get data from parameters as fallback
      if (e.parameter) {
        data = {
          attendance: e.parameter.attendance || '',
          guestSide: e.parameter.guestSide || '',
          guestCount: e.parameter.guestCount || '',
          specialMessage: e.parameter.specialMessage || ''
        };
      } else {
        throw new Error('Failed to parse request data: ' + parseError.toString());
      }
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

