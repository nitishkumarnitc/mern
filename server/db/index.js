const APP_CONSTANTS = require('./../constants');
const mongoose = require('mongoose');


mongoose.connect(APP_CONSTANTS.DB_URL, {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

module.exports = connection;