const express = require('express');
const mongoose = require('mongoose');

//setting up server
const routes = require('./routes'); //automatically grabs index.js from routes folder

const PORT = process.env.PORT || 3001;

const app = express();

//set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup routes
app.use(routes);
// require jwt auth here 
// passing down the results of the authentication strategies in jwtAuth
require('./services/passport');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/todo_db', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(PORT, () => console.log("Server started"));
