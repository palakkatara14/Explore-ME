

// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const Image = require('./db/image.model');

// router.post('/save-image', async (req, res) => {
//     console.log('req.body:', req.body);
//   try {
//     if (!req.body.userId) {
//       return res.status(400).send({ message: 'Missing userId' });
//     }

//     const userId = new mongoose.Types.ObjectId(req.body.userId);
//     const image = req.body.image;
//     const text = req.body.text;
//     const similar_images = req.body.similar_images;

//     // Save the generated text and similar images to the database
//     const imageDoc = new Image({
//       userId,
//       image,
//       text,
//       similar_images
//     });
//     await imageDoc.save();

//     res.json({ message: 'Image saved successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ message: 'Error saving image' });
//   }
// });

// module.exports = router;


// routes/saveImage.js



// const express = require('express');
// const router = express.Router();
// const Image = require('./db/imagesave');
// const User = require('./db/User');

// router.post('/save-image', async (req, res) => {
//   try {
//     const { username, image, text, similarImages } = req.body;

//     // Check if the username exists
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(400).json({ message: 'Username does not exist' });
//     }

//     // Save the image data with the username
//     const imageData = new Image({
//       username,
//       image,
//       text,
//       similarImages,
//     });

//     await imageData.save();

//     res.json({ message: 'Image saved successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ message: 'Error saving image' });
//   }
// });

// module.exports = router;




const express = require('express');
const router = express.Router();
const Image = require('./db/imagesave');
const User = require('./db/User');

router.post('/save-image', async (req, res) => {
  try {
    const { username, image, text, similarImages } = req.body;

    // Check if the username exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Username does not exist' });
    }

    // Save the image data with the username
    const imageData = new Image({
      username,
      image,
      text,
      similarImages,
    });

    // Save the image data to MongoDB
    await imageData.save();

    console.log('Image saved successfully:', imageData); // Log the saved image data
    res.json({ message: 'Image saved successfully' });
  } catch (err) {
    console.error('Error saving image:', err);
    res.status(500).send({ message: 'Error saving image' });
  }
});

module.exports = router;
