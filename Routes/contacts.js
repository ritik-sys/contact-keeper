const express = require("express");
const router = express.Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator');
//  get 
//  /api/contacts
//  get contacts
//  private

router.get("/", auth, async (req, res) => {
    try {
        let contact = await Contact.find({ user: req.decoded.data });
        if (contact) {
            return res.send(contact)
        }
        else {
            res.send('contact not found')
        }
    } catch (error) {
        res.json({
            msg: 'Error in getting contacts'
        });

    }
});

router.post("/", [auth,
    [
        check('name').not().isEmpty(),
        check('email').isEmail()
    ]
], async (req, res) => {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }
    try {
        const { name, email, phone, type } = req.body;
        //console.log(name, email, phone, type)
        let contact = new Contact({
            user: req.decoded.data,
            name,
            email,
            phone,
            type,
        })
        await contact.save();
        res.json({ contact });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'server error' });
    }

});

router.put("/", (req, res) => {
    res.send('put contacts')
});

router.delete("/", (req, res) => {

});

module.exports = router;

