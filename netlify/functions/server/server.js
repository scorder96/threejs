import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;
// const __dirname = path.resolve();

// Endpoint to serve the JSON file
app.get('/data', (req, res) => {
  const filePath = path.join(__dirname, 'elementsData.json');
  
  // Check if the JSON file exists
  if (fs.existsSync(filePath)) {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    res.json(JSON.parse(jsonData));
  } else {
    res.status(404).send('JSON file not found');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
