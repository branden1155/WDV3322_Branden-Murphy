const express = require('express');
const mongoose  = require('mongoose');
const app = express();
const routes = require("../api/routes/routes")
const cors = require('cors');
require("dotenv").config();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());

app.get("/", (req,res)=>{
    res.status(200).json({
        message: "Service is up!",
    });
});

//Calling Routes for API
app.use('/users', routes)

//Middleware for handling Errors
app.use((req,res,next)=>{
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});
app.use((error,req,res,next)=>{
    res.status(error.status || 500).json({
        error: {
            message: error.message,
            status: error.status,
        },
    });
});

//Mongoose Connection
mongoose.connect(process.env.mongoDBURL, (err) => {
    if(err){
        console.log("Error Connecting to Mongoose", err.message);
    }
    else {
        console.log("MongoDB is up and running!");
    };
});
module.exports = app;