const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.jwt_key);
        req.userData = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authorization Failed!'})
    }
};
