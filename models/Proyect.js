const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        required: true
    },
    createdAtMoment: {
        type: String,
        required: true
    },
    createdAtMilliseconds: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Project', ProjectSchema);