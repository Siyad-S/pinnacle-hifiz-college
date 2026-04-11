# How to Link Contact Form to Google Sheets

We have configured the backend to automatically send all contact form submissions directly to a Google Sheet via a **Google Apps Script Webhook**. This approach is much simpler and more robust than traditional Google Forms integration.

## Setup Instructions

### 1. Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a **Blank Spreadsheet**.
2. Name the spreadsheet (e.g., `Hifz Academy Contact Submissions`).
3. Set up your column headers in the first row:
   - Cell **A1**: `Name`
   - Cell **B1**: `Email`
   - Cell **C1**: `Phone`
   - Cell **D1**: `Message`
   - Cell **E1**: `Timestamp`

### 2. Add the Apps Script
1. In your Google Sheet, click on **Extensions** -> **Apps Script** in the top menu.
2. Delete any code in the `Code.gs` file and paste the following snippet:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add row to Google Sheet
    sheet.appendRow([
      data.name,        // Name
      data.email,       // Email
      data.phone,       // Phone
      data.message,     // Message
      new Date()        // Timestamp
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```
3. Click the **Save project** icon (floppy disk) or press `Ctrl+S`.

### 3. Deploy and Get the Webhook URL
1. Click the blue **Deploy** button in the top right corner, and select **New deployment**.
2. Click the gear icon (**Select type**) and check **Web app**.
3. Configure the deployment settings exactly like this:
   - **Description**: `Version 1`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` *(Crucial: Must be set to Anyone!)*
4. Click **Deploy**.
5. *Note: You will be prompted to "Authorize access". Click it, select your Google Account, click "Advanced", and click "Go to Untitled project (unsafe)". Allow the permissions.*
6. After it finishes, copy the generated **Web app URL** (It will look like `https://script.google.com/macros/s/.../exec`).

### 4. Link it to Your Website
1. Open your project folder and locate your `.env.local` or `.env` file.
2. Add a new variable called `GOOGLE_APP_SCRIPT_URL`, and paste the URL you copied:
```env
GOOGLE_APP_SCRIPT_URL=https://script.google.com/macros/s/AKfycby...your...url.../exec
```
3. Save the `.env` file and **restart your development server** (`npm run dev`).

## Verification
Submit a test message through your Contact Us form on the website. Within a second, it should appear in your Google Sheet!
