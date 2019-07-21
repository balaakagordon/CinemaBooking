const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const userSchema = require('./UserSchema');

userSchema.statics = {
    create: function(data, callback) {
        var user = new this(data);
        user.save(callback);
    },

    getUsers: function(query, callback) {
        this.find(query, callback);
    },

    getByEmail: function(query, callback) {
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
    },
}


userSchema.methods = {
    validatePassword: function(password) {
        const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
        return this.hash === hash;
    },

    setPassword: function(password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
        return this.hash;
    },

    generateJWT: function() {
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);

        return jwt.sign({
            email: this.email,
            id: this._id,
            exp: parseInt(expirationDate.getTime() / 1000, 10),
        }, 'secret');
    },

    toAuthJSON: function() {
        return {
            _id: this._id,
            email: this.email,
            token: this.generateJWT(),
        };
    }
}

var UserModel = mongoose.model('User', userSchema)
module.exports = UserModel;