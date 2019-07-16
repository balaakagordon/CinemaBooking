var mongoose = require('mongoose');
var chalk = require('chalk');
const dbUrl = 'mongodb://localhost:27017/cinema_booking';

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

options = {
    useCreateIndex: true,
    useNewUrlParser: true
}

module.exports = function () {
    mongoose.connect(dbUrl, options);

    mongoose.connection.on('connected', function() {
        console.log(connected(`Mongoose default connection is open to ${dbUrl}`));
    });

    mongoose.connection.on('errror', function(err) {
        console.log(error(`Mongoose default connection has occured ${err} error`));
    });

    mongoose.connection.on('disconnected', function() {
        console.log(disconnected("Mongoose default connected is disconnected"));
    });

    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0)
        });
    })
}