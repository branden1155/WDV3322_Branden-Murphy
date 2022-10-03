const express = require('express');
const routes = express.Router();

//Routes for Signup/Login/and Profile.

//Signup
routes.post('/signup', (req,res)=>{
    res.status(200).json({
        message: 'This is the Signup page using - POST',
        method: req.method,
    });
});
//Login
routes.post('/login', (req, res)=>{
    res.status(200).json({
        message: 'This is the Login Page using - POST',
        method: req.method,
    });
});
//Profile
routes.get('/profile', (req,res,next)=>{
    res.status(200).json({
        message: 'This is the Profile Page using - GET',
        method: req.method,
    });
});

module.exports = routes;