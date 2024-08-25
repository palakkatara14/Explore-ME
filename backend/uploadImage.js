





const express = require('express');
const router = express.Router();
const Photo = require('./db/imagestore');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize GoogleGenerativeAI with your API key
const genAI = new GoogleGenerativeAI('AIzaSyAVRquZtQ9_FcyIUy-nA0LM9SHGcoQ2Clo'); // Replace with your API key

// Unsplash API access key
const unsplashAccessKey = 'miYvvB_AHjVSJ0MyLZURJbtmhSt1e3wXWOOyzbm7XkA'; // Replace with your actual Unsplash access key

// Endpoint for uploading image
router.post('/upload-image', async (req, res) => {
  try {
    const imageBuffer = Buffer.from(req.body.image, 'base64');
    const contentType = req.body.contentType;

    // Generate text using Gemini AI API
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
    const result = await model.generateContent([{
      inlineData: {
        data: imageBuffer.toString('base64'),
        mimeType: contentType
      }
    }]);

    const generatedText = result.response.text();

    // Dynamically import node-fetch
    const fetch = await import('node-fetch').then(module => module.default);

    // Fetch similar images based on the generated text
    const unsplashResponse = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(generatedText)}&per_page=5`, {
      headers: {
        Authorization: `Client-ID ${unsplashAccessKey}`,
      },
    });

    if (!unsplashResponse.ok) {
      throw new Error('Failed to fetch similar images from Unsplash');
    }

    const unsplashData = await unsplashResponse.json();
    const similarImages = unsplashData.results.map(image => image.urls.regular);

    // Save the image and generated text to the database
    const newPhoto = new Photo({
      image: {
        data: imageBuffer,
        contentType: contentType
      },
      generatedText: generatedText
    });

    await newPhoto.save();
    res.status(201).send({ message: 'Image uploaded successfully', generatedText, similarImages });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error uploading image' });
  }
});

module.exports = router;
