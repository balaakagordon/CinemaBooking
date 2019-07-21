const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    User.findOne({email})
    .then((user) => {
        console.log('user ====> ', user)
        if(!user){
            return done(null, false, {
                message: "User not found"
            })
        }
        // if (!User.validatePassword(user)) {
        if(!user || !user.validatePassword(password)) {
            return done(null, false, {errors: {'password': 'is invalid'}})
        }

        return done(null, user);
    }).catch(done);
}))