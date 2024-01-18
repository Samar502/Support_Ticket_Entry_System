const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    severity: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
        default: null
    },
    status: {
        type: String,
        default: 'New'
    },
    resolvedOn: {
        type: Date,
        default: null
    }
})

module.exports = mongoose.model('Ticket', ticketSchema);