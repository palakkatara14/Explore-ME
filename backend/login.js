const express = require('express');
const User = require('./db/User'); // Adjust the path as necessary
const router = express.Router();

router.post('/login', async (req, res) => {
    console.log("entered...")
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});


module.exports = router;


