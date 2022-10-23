const express = require('express');
const routes = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user');
const mongoose = require('mongoose');
const { saveUser, findUser } = require('../../db/db');
const jwt = require('jsonwebtoken');
const checkAuth = require('../../auth/checkAuth');
require('dotenv').config();

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
                    lastName: req.body.lastName,
                    address: req.body.address,
                    city: req.body.city,
                    state: req.body.state,
                    zip: req.body.zip,
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
        if(!result[0]){
            res.status(500).json({ message: "You have Failed the Authentication, e-Mail does not Exsist!"})
        }
        if(result[0]) {
            bcrypt.compare(req.body.password, result[0].password, (err, output)=>{
                if(err){
                    return res.status(501).json({ message: err.message });
                }
                if(output){
                    const token = jwt.sign(
                        {email: result[0].email,
                        name: result[0].firstName,
                        lastName: result[0].lastName,
                        address: result[0].address,
                        city: result[0].city,
                        state: result[0].state,
                        zip: result[0].zip,
                        password: result[0].password},
                        process.env.jwt_key); 
                    res.status(201).json({
                        message: 'Authentication is Successful, You have logged in!',
                        name: result[0].firstName,
                        token: token
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
routes.get('/profile', checkAuth, (req,res)=>{
    res.status(200).json({ message: req.userData });
});

module.exports = routes;