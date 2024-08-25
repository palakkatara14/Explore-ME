
const mongoose = require('mongoose');
const dotenv= require('dotenv');
dotenv.config();
const uri=process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));