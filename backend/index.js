







const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require("cors")
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Express application
const app = express();

// Initialize GoogleGenerativeAI with your API key
const genAI = new GoogleGenerativeAI('AIzaSyAVRquZtQ9_FcyIUy-nA0LM9SHGcoQ2Clo'); // Replace with your API key

// Unsplash API access key
const unsplashAccessKey = 'miYvvB_AHjVSJ0MyLZURJbtmhSt1e3wXWOOyzbm7XkA'; // Replace with your actual Unsplash access key

// Middleware to handle JSON and URL-encoded form data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());

require('./db/config'); 
const signup = require("./signup");
const login = require("./login");
const collectionapi = require('./collection');
const saveImageapi = require('./saveImage');
const uploadImageApi = require("./uploadImage");
const logoutapi= require("./logout");

// Use the routes
app.use(signup);
app.use(login);
app.use(collectionapi);
app.use(saveImageapi);
app.use(uploadImageApi);
app.use(logoutapi);

// Define the /similar-images route
app.get('/similar-images', async (req, res) => {
  try {
    const { text } = req.query;

    // Dynamically import node-fetch
    const fetch = await import('node-fetch').then(module => module.default);

    // Call Unsplash API to fetch similar images based on generated text
    const unsplashResponse = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(text)}&per_page=5`, {
      headers: {
        Authorization: `Client-ID ${unsplashAccessKey}`,
      },
    });

    if (!unsplashResponse.ok) {
      throw new Error('Failed to fetch similar images from Unsplash');
    }

    const unsplashData = await unsplashResponse.json();
    const similarImages = unsplashData.results.map(image => image.urls.regular);

    // Send the JSON response with images
    res.json({ similarImages });
  } catch (error) {
    console.error('Error fetching similar images:', error);
    res.status(500).send('Failed to fetch similar images');
  }
});

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});