const express = require('express');
const router = express.Router();
const User = require("./db/User");

router.post('/logout', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.isLoggedIn = false;
    await user.deleteOne({ email:req.body.email});
    res.json({ message: 'User has logged out' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging out' });
  }
});

module.exports = router;