
const express = require('express');
const router = express.Router();
const User= require('./db/User');


router.post("/signup",async (req,res)=>{
 
    let user= new User(req.body);
    let result= await user.save();
    res.send(result);

})

module.exports= router;
