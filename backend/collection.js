


const express = require('express');
const router = express.Router();
const Image = require('./db/imagesave');

router.get('/collection', async (req, res) => {
  try {
    const username = req.query.username; 
    if (!username) {
      return res.status(400).send({ message: 'Username is required' });
    }
    const images = await Image.find({ username });
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error retrieving collection' });
  }
});

module.exports = router;