// functions/get-data.js

exports.handler = async function (event, context) {
    // You can return any JSON data here
    const data = {
      name: "Netlify API",
      description: "This is a simple API that returns JSON",
      version: "1.0.0",
    };
  
    return {
      statusCode: 200,
      body: JSON.stringify(data), // Convert the object to JSON string
      headers: {
        'Content-Type': 'application/json',
      },
    };
  };
  