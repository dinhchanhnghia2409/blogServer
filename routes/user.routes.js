const express = require("express");
const route = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

route.post('/user/signup',async (req,res)=>{
    const {username,password} = req.body;
    if(!username || username == "" || username == null){
        return res.status(400).json({error: "Can't blank username"});
    }
    if(!password || password == "" || password == null){
        return res.status(400).json({error: "Can't blank password"})
    }

    const CreateAccount = bcrypt.hash(password,10).then((hashedPassword)=>{
        const user = new User({
            username,
            password: hashedPassword,
        });
        user.save().then(()=>{res.status(201).json({message: "Signup success"})})
    });

    await CreateAccount();
    

    

    
});

module.exports = route;