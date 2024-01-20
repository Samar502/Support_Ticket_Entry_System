const mongoose = require('mongoose');

const agentSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        // required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number'],
        // required: true
    },
    description: {
        type: String,
        required: [true, 'Please add a Description']
        // required: true
    },
    active: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Agent', agentSchema);