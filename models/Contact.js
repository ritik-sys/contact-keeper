const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
    },
    type: {
        type: String,
        default: 'Personal',
    },
    date: {
        type: Date,
        default: Date.now()
    }
})
const Contact = mongoose.model("contact", contactSchema)
module.exports = Contact
