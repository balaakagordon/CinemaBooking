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
        unique: false,
        required: true
    },
    phone: {
        type: String,
        unique: false,
        required: true
    },
    moviesWatched: {
        type: Array,
        unique: false,
        required: false
    },
    active: {
        type: Boolean,
        unique: false,
        required: true
    }
}, {
    timestamps: true
});

module.exports = userSchema;