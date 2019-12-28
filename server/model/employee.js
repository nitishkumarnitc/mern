const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Employee = new Schema({
    name: {
        type: String,
        minlength: [4, 'Name must be at least 4 characters.'],
        maxlength: [200, 'Name must be less than 100 characters.'],
        required: [true, 'Your Name cannot be blank.'],
        trim: true,

    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Your Date Of Birth cannot be blank.'],


    },
    salary: {
        type: [Number],
        required: [true, 'Your salary  cannot be blank.'],
        minValue: [1, 'Salary must be at least 1.']

    },
    skills: {
        type: [Object],
        required: [true, 'Your skills  cannot be blank.'],

    },
    profile_image_url: {
        type: String,
        required: [true, 'You must upload profile pic.'],
    }
});

module.exports = mongoose.model('Employee', Employee);