const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
    question: {type: String, required: true, minlength: 6},
    q0: { type: String, required: true, minlength: 2 },
    votes_q0: { type: Number, default: 0},
    q1: { type: String, required: true, minlength: 2 },
    votes_q1: { type: Number, default: 0},
    q2: { type: String, required: true, minlength: 2 },
    votes_q2: { type: Number, default: 0},
    q3: { type: String, required: true, minlength: 2 },
    votes_q3: { type: Number, default: 0},
    author: { type: String, required: true, minlength: 1 }
},
{timestamps: true})

mongoose.model('Poll', PollSchema)