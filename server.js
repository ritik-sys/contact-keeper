const express = require("express");
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const connectDB = require('./config/db')
const User = require('./models/User');



app.use(express.json({ extended: false }))
//connect mongo db
connectDB()

//Routes

app.get("/", (req, res) => {
    res.send("home page")
});

app.post("/", (req, res) => {
    res.send(req.body);
});

//users
app.post("/api/users", [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'please include a valid email').isEmail(),
    check('password', 'please enter a password').isLength({ min: 6 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json("User already exists");
            }
            user = new User({
                email,
                name,
                password
            });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload, "secret", {
                expiresIn: 3600000
            }, (err, token) => {
                if (err) {
                    res.json(err);
                }
                res.json(token);
            })
        }
        catch (err) {
            console.log(err);
        }
    })



//oaut

app.get("/api/oauth", [
    check('email', 'please include a valid password').isEmail(),
    check('password', 'password is required').exists()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: 'invalid credentials' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json('invalid credentials')
            }
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload, "secret", {
                expiresIn: 3600000
            }, (err, token) => {
                if (err) {
                    res.json(err);
                }
                res.json(token);
            })
        }
        catch (err) {
            console.log(err);
        }
    })
app.post("/api/oauth", (req, res) => {
    res.send("post oauth")
})

//contacts

app.get("/api/contacts", (req, res) => {
    res.send("get contacts")
})
app.post("/api/contacts", (req, res) => {
    res.send("post contacts")
})
app.put("/api/contacts/:id", (req, res) => {
    res.send("update contacts")
})
app.delete("/api/contacts/:id", (req, res) => {
    res.send("delete contacts")
})



//server start
app.listen(3000, () => {
    console.log(`Server is up at 3000`);
})











