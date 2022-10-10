const express = require('express');
const routes = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user');
const mongoose = require('mongoose');
const { saveUser, findUser } = require('../../db/db');

//Routes for Signup/Login/and Profile.

//Signup
routes.post('/signup', (req,res, next)=>{
    const password = req.body.password;
    User.findOne({ email: req.body.email }, (error, result) => {
        if(result){
            res.status(401).json({ message: "This e-Mail already exsist!"})
        } 
        else {
        bcrypt.hash(password, 10, (err, hash)=>{
            if(err){
                res.status(500).json({ message: err.message });
            } else {
                const user = new User({
                    _id: mongoose.Types.ObjectId(),
                    firstName: req.body.firstName,
                    email: req.body.email,
                    password: hash,
                });
                saveUser(user).then(result => {
                    res.status(201).json({
                    message: "User Created!",
                    name: result.firstName,
                    user: result,
                })
                }).catch(err => res.status(500).json({ error: { message: err.message }}))
            };
            });
        };
    });    
});

//Login
routes.post('/login', (req, res, next)=>{
    findUser({ email: req.body.email }).then(result =>{
        if(!result){
            res.status(500).json({ message: "You have Failed the Authentication, e-Mail does not Exsist!"})
        }
        if(result) {
            bcrypt.compare(req.body.password, result[0].password, (err, result)=>{
                if(err){
                    return res.status(501).json({ message: err.message });
                }
                if(result){
                    res.status(201).json({
                        message: 'Authentication is Successful, You have logged in!',
                        result: result,
                        name: result.firstName
                    });
                } else {
                    res.status(401).json({
                        message: 'Authentication failed, Password is incorrect!',
                        result: result,
                    });
                };
            });
        };
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