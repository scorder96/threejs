const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(100000)

  // Navigate to the target website
  await page.goto('https://erail.in/station-live/NDLS');  // Replace with the actual URL

  // Scrape all matching elements and store their content in an array
  const elementsData = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.name.bold')).map(element => element.innerText);
  });

  // Create a JSON object
  const transformedData = elementsData.map(item => {
    const [train_no, ...train_name] = item.split(' ');
    return {
      train_no: train_no,
      train_name: train_name.join(' ') // Join remaining parts as the train name
    };
  });
  
  // Save the JSON to a file
  fs.writeFileSync('elementsData.json', JSON.stringify(transformedData, null, 2));

  console.log('Data saved to elementsData.json');

  // Close the browser
  await browser.close();
})();
