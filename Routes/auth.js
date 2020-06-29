const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const checkToken = require('../middleware/auth');
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator');
//  get 
//  /api/auth
//  check whether user is registerd or not
//  private
router.get("/", checkToken, async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.decoded.data }).select("-password");
        res.json({ user })

    } catch (error) {
        res.json({
            msg: 'Wrong Token'
        })

    }


});


//  get 
//  /api/auth
//  permit a user
//  public
router.post("/", [
    check('email').isEmail(),
    check('password').isLength({ min: 5 })
], async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({
            msg: `invalid details`
        })
    }
    let findPass = await bcrypt.compare(password, user.password);
    if (!findPass) {
        return res.status(400).json({
            msg: `invalid details`
        })
    }
    const token = jwt.sign({
        data: user.id
    }, 'sec', {
        expiresIn: 360000
    })
    res.json({
        msg: `user saved sucessfully`,
        token: token
    });
});

module.exports = router;
