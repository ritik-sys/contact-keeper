const express = require("express");
const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    let token = req.header('x-auth-token');
    if (!token) {
        return res.json({
            msg: `No token , auth failed`
        })
    }
    jwt.verify(token, 'sec', (err, decoded) => {
        if (err) {
            return res.json({
                message: 'Token is not valid'
            });
        }
        else {
            req.decoded = decoded;
            next();
        }
    })
}
module.exports = checkToken;