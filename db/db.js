const mongoose = require('mongoose');
const User = require('../api/model/user')

const connection = async() => {
    console.log("Real Connection");
    await mongoose.connect("mongodb://localhost:27017/testing");
}

const disconnect = async() => {
    console.log("Disconnected");
    await mongoose.connection.close();
}

//module for saving a user to the database
const saveUser = async (user) => {
    return await user.save();
};

//module for finding user based off an object, such as email, or username
const findUser = async (object) => {
    return User.find(object);
};

module.exports = { saveUser, findUser, connection, disconnect };