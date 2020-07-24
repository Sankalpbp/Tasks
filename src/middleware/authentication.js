'use strict'

const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const authentication = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'wearedevelopers');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (user === null) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please Authenticate' });
    }
};

module.exports = authentication;