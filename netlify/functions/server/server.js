import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

exports.handler = async (event, context) => {
const __dirname = path.resolve()
// Define the path for the JSON file in the same directory as this script
const jsonFilePath = path.join(__dirname, './netlify/functions/server/trainData.json');

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the target webpage (replace with the actual URL)
  await page.goto('https://erail.in/train-enquiry/04911');

  // Wait for the table to load
  await page.waitForSelector('tbody');

  // Scrape the table data
  const tableData = await page.evaluate(() => {
    const rows = document.querySelectorAll('tbody tr');
    let data = [];

    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      let rowData = [];

      cells.forEach(cell => {
        rowData.push(cell.innerText.trim());
      });

      data.push(rowData);
    });

    return data;
  });

  // Save the scraped data into a JSON file
  tableData.splice(0,17)
  fs.writeFileSync(jsonFilePath, JSON.stringify(tableData, null, 2));

  console.log('Scraped table data saved to trainData.json');

  // Close the browser
  await browser.close();
})();

  try {
    // Read the JSON file synchronously
    const jsonPath = path.resolve(__dirname, './trainData.json');
    const fileContents = fs.readFileSync(jsonPath, 'utf8');
    
    
    // Parse JSON data
    const trains = JSON.parse(fileContents);

    // Return the JSON data in the response
    return {
      statusCode: 200,
      body: JSON.stringify(trains),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    console.error('Error reading JSON file:', error);
    
    // Handle errors and return a 500 status
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
