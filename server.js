const express = require('express');
//setting up server
const mongoose = require('mongoose'); //automatically grabs index.js from routes folder

const routes = require('./routes');

const PORT = process.env.PORT || 3001;

const app = express();

// Setup middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup routes
app.use(routes);
// require jwt auth here 
// passing down the results of the authentication strategies in jwtAuth
require('./services/passport');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/todo_db', { useNewUrlParser: true,  useUnifiedTopology: true  });

app.listen(PORT, () => console.log("Server started"));
