const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    template: {
        type: String,
        required: true
    },
    projects: [
        {
            title: String,
            description: String,
            githubLink: String,
            media: [String],
            skills: [String],
        },
    ],
    skills: [String],
    certifications: [
        {
            name: String,
            link: String,
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
