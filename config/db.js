
const moongoose = require('mongoose')
const uri = "mongodb+srv://admin-ritik:test123@cluster0-t4jbz.mongodb.net/contactKeeper?retryWrites=true&w=majority";


const connectDB = () => {
    moongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('mongo connected'))
        .catch(err => { console.log(err); })
}
module.exports = connectDB;