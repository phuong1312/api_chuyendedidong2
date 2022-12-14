const { request } = require('http');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const user = require('../models/user');
require('dotenv').config();

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    // console.log(authorization);
    if (!authorization) {
        return res.status(401).send({ error: "You must be logged in, key not given" });
    };
    const token = authorization.replace("token ", "");
    // console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).send({ error: "You must be logged in, token invalid" });
        };
        const {_id} = payload;
        user.findById(_id).then(userData => {
            req.user = userData;
            next();
        });
    });
};