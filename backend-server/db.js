const mongoose = require("mongoose");
require('dotenv').config();

const mongoURL = process.env.MONGO_URI;

mongoose.connect(mongoURL , {useUnifiedTopology : true , useNewUrlParser:true})

var connection = mongoose.connection

connection.once('open', () => {
    console.log('Mongo DB Connection Running');
});

connection.on('error', (err) => {
    console.error('Mongo DB Connection Error:', err.message);
});

module.exports = mongoose