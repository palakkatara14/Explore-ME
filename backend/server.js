

const express = require('express');
const mongoose= require("mongoose");

const router= express.Router();





const fetch = require('node-fetch');

router.get('/similar-images', async (req, res) => {
  try {
    const { text } = req.query;

    // Call Unsplash API to fetch similar images based on generated text
    const unsplashResponse = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(text)}&per_page=5`, {
      headers: {
        Authorization: `Client-ID ${'miYvvB_AHjVSJ0MyLZURJbtmhSt1e3wXWOOyzbm7XkA'}`,
      },
    });

    if (!unsplashResponse.ok) {
      throw new Error('Failed to fetch similar images from Unsplash');
    }

    const unsplashData = await unsplashResponse.json();

    if (!unsplashData.results || unsplashData.results.length === 0) {
      throw new Error('No results found from Unsplash');
    }

    const imageUrls = unsplashData.results.map(image => image.urls.regular);

    // Fetch each image and convert to Base64
    const imagePromises = imageUrls.map(async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch image from ${url}`);
        }
        const buffer = Buffer.from(await response.arrayBuffer());
        return `data:image/jpeg;base64,${buffer.toString('base64')}`;
      } catch (error) {
        console.error(`Error fetching image from ${url}:`, error);
        throw error; // Rethrow the error to propagate it
      }
    });

    const similarImages = await Promise.all(imagePromises);

    res.json({ similarImages });
  } catch (error) {
    console.error('Error fetching similar images:', error);
    res.status(500).json({ error: 'Failed to fetch similar images' });
  }
});

  
  module.exports= router;