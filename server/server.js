const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db_connection=require('./db')
const cors = require('cors');

const APP_CONSTANTS=require('./constants');
const todoRoutes=require('./routes/todos')

app.use(cors());
app.use(bodyParser.json());
app.use('/todos', todoRoutes);

app.listen(APP_CONSTANTS.PORT, function() {
    console.log("Server is running on Port: " + APP_CONSTANTS.PORT);
});