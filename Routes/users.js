const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const saltRounds = 10;
const { check, validationResult } = require('express-validator');
//  post 
//  /api/users
//  register a user
//  public
const app = express();
router.post("/", [
    check('name').not().isEmpty(),
    check('email').isEmail(),
    check('password').isLength({ min: 5 })
],
    async (req, res) => {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const { name, email, password } = req.body;


        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({
                    msg: "user already exist"
                })
            }
            user = await new User({
                name,
                email,
                password
            })

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const token = jwt.sign({
                data: user.id
            }, 'sec', {
                expiresIn: 360000
            })
            res.send({ token })

        }
        catch (err) {
            console.log(err);
        }



    })

module.exports = router;



