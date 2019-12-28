const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Employee = new Schema({
    name: {
        type: String
    },
    dateOfBirth: {
        type: Date
    },
    salary: {
        type: Number
    },
    skills: {
        type: [Object]
    },
    profile_image_url: {
        type: String
    }
});

module.exports = mongoose.model('Employee', Employee);