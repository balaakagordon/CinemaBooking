const mongoose = require('mongoose');
const userSchema = require('../models/UserModel');

userSchema.statics = {
    create: function(data, callback) {
        var user = new this(data);
        user.save(callback);
    },

    get: function(query, callback) {
        this.find(query, callback);
    },

    getByName: function(query, callback) {
        this.find(query, callback);
    },

    getById: function(query, callback) {
        this.find(query, callback);
    },

    update: function(query, updateData, callback) {
        this.findOneAndUpdate(query, {$set: updateData}, {new: true}, callback)
    },

    delete: function(query, callback) {
        this.findOneAndDelete(query, callback);
    }
}

var userModel = mongoose.model('Users', userSchema)
module.exports = userModel;