

const mongoose = require('mongoose');

// Define schema for Image
const imageSchema = new mongoose.Schema({
  username: { type: String, required: true },
  image: { type: String, required: true }, 
  text: { type: String, required: true },
  similarImages: [{ type: String }], 
  createdAt: { type: Date, default: Date.now },
});

// Create model for Image using the schema
const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
