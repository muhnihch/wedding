/**
 * Google Sheets API Backend Server
 * 
 * This is a Node.js/Express server that uses Google Sheets API v4
 * to write data directly to your Google Sheet.
 * 
 * SETUP:
 * 1. Install dependencies: npm install express googleapis
 * 2. Set up Google Cloud Project and enable Sheets API
 * 3. Create service account and download credentials
 * 4. Share your Google Sheet with the service account email
 * 5. Set environment variables (see below)
 * 6. Run: node sheets-api-backend.js
 * 
 * Environment Variables:
 * - GOOGLE_SHEET_ID: Your Google Sheet ID (from URL)
 * - GOOGLE_SERVICE_ACCOUNT: Path to service account JSON file
 * - PORT: Server port (default: 3000)
 */

const express = require('express');
const { google } = require('googleapis');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Your Google Sheet ID (from the URL)
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID || '1Eqjq5ZLCRijHjilFpARHwA4mVAzeZL3ljCcHsWacMO4';
const SHEET_NAME = 'Form responses'; // or your sheet name

// Initialize Google Auth
async function getAuth() {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_SERVICE_ACCOUNT || './service-account-key.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return auth;
}

// POST endpoint to receive form data
app.post('/api/submit', async (req, res) => {
  try {
    const { attendance, guestSide, guestCount, specialMessage } = req.body;

    // Validate required fields
    if (!attendance || !guestSide || !guestCount) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields'
      });
    }

    // Authenticate
    const auth = await getAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    // Get current timestamp
    const timestamp = new Date().toISOString();

    // Prepare row data
    const values = [[
      timestamp,
      attendance,
      guestSide,
      guestCount,
      specialMessage || ''
    ]];

    // Append row to sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:E`, // Adjust range as needed
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: values
      }
    });

    res.json({
      status: 'success',
      message: 'Data saved successfully',
      updatedCells: response.data.updates.updatedCells
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to save data'
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Submit endpoint: http://localhost:${PORT}/api/submit`);
});

