var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        unique: false,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    moviesWatched: {
        type: Array,
        unique: false,
        required: false
    },
    password: {
        type: String,
        unique: false,
        required: true
    },
    active: {
        type: Boolean,
        unique: false,
        required: true
    },
    hash: String,
    salt: String
}, {
    timestamps: true
});

module.exports = userSchema;