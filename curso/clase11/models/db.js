var mongoose = require('mongoose');

// build the connection string
var dbURI = 'mongodb://localhost/nodestore';

// create the database connection
mongoose.connect(dbURI);

// handle various database events
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to: ', dbURI);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ', err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

// handle unexpected process termination
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected due to application termination');
        process.exit(0);
    });
});

// load and exports all the mongoose models

exports.User = require('./user');
//exports.Product = require('./product');
//exports.Order = require('./order');
