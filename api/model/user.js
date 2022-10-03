const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    zipcode: {
        type: Number,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
});

module.export = mongoose.model('User', userSchema);