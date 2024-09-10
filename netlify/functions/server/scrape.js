const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the target webpage (Replace with the actual URL)
  await page.goto('https://erail.in/train-enquiry/04911');

  // Wait for the table to load
  await page.waitForSelector('tbody');

  // Scrape the table data
  const trainStations = await page.evaluate(() => {
    const rows = document.querySelectorAll('tbody tr');
    let data = [];

    rows.forEach(row => {
      const stationOrder = row.querySelector('td:nth-child(1)')?.innerText.trim();
      const stationCode = row.querySelector('td:nth-child(2)')?.innerText.trim();
      const stationName = row.querySelector('td:nth-child(3) span')?.innerText.trim();
      const zone = row.querySelector('td:nth-child(4)')?.innerText.trim();
      const division = row.querySelector('td:nth-child(5)')?.innerText.trim();
      const arrivalTime = row.querySelector('td:nth-child(6)')?.innerText.trim();
      const departureTime = row.querySelector('td:nth-child(7)')?.innerText.trim();
      const haltTime = row.querySelector('td:nth-child(8)')?.innerText.trim();
      const platform = row.querySelector('td:nth-child(10)')?.innerText.trim();
      const day = row.querySelector('td:nth-child(11)')?.innerText.trim();

      data.push({
        stationOrder,
        stationCode,
        stationName,
        zone,
        division,
        arrivalTime,
        departureTime,
        haltTime,
        platform,
        day
      });
    });

    return data;
  });

  // Save the scraped data into a JSON file
  fs.writeFileSync('trainStations.json', JSON.stringify(trainStations, null, 2));

  console.log('Scraped data saved to trainStations.json');

  // Close the browser
  await browser.close();
})();
