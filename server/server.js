const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db_connection = require('./db')
const cors = require('cors');
const fileupload = require("express-fileupload");

const APP_CONSTANTS = require('./constants');
const employeeRoutes = require('./routes/employee')
const imageRoutes = require('./routes/images')


app.use(cors());
app.use(bodyParser.json());
app.use(fileupload());
app.use('/employees', employeeRoutes);
app.use('/images', imageRoutes);


app.listen(APP_CONSTANTS.PORT, function () {
    console.log("Server is running on Port: " + APP_CONSTANTS.PORT);
});