const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    experience: [
        {
            _id: false,
            title: String,
            company: String,
            dates: String,
            description: String,
        }
    ],
    skills: [String],
    information: {
        bio: String,
        location: String,
        website: String,
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);
