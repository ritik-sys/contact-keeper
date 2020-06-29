const express = require("express");
const app = express();
const db = require('./config/db');

db();

app.use(express.json({ extended: false }));
app.use('/api/users', require('./Routes/users'));
app.use('/api/contacts', require('./Routes/contacts'));
app.use('/api/auth', require('./Routes/auth'));




app.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send('Home page')
})


app.listen(process.env.PORT || 5000, () => {
    console.log(`server up at 5000`);
})