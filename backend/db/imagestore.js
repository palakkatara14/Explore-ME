

const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String
    }
});

const Photo = mongoose.models.Photo || mongoose.model('Photo', photoSchema);

module.exports = Photo;