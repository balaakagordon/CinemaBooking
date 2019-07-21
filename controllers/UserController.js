const Users = require('../models/UserModel');
const passport = require('passport');
const auth = require('../routes/auth');

exports.createUser = function (req, res, next) {
    var userData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        moviesWatched: [],
        active: true,
    }

    Users.getByEmail({email: req.body.email}, function(err, user) {
        if(err) {
            res.json({
                error: err
            })
        } else if (user.length < 1) {
            const finalUser = new Users(userData);
            finalUser.setPassword(user.password);
            return finalUser.save()
            .then(() => res.json({
                message: "User created successfully",
                user: finalUser.toAuthJSON()
            }));
        } else {
            res.json({
                message: "This user already exits"
            })
        }
})
}

exports.loginUser = function (req, res, next) {
    const { body: { user } } = req;
    return passport.authenticate('local', (err, passportUser, info) => {
        if(err) {
            return next(err);
        } else if (passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();
            res.json({
                message: "Successfully logged in!",
                user: user.toAuthJSON()
            })
        } else {
            return res.status(400).info;
        }
     })(req, res, next)
}

exports.getUsers = function(req, res, next) {
    Users.getUsers({}, function(err, users) {
        if(err) {
            res.json({
                error: err
            })
        } else {
            res.json({
                users: users
            })
        }
    })
}

exports.getUser = function(req, res, next) {
    Users.getById({_id: req.params.id}, function(err, users) {
        if(err) {
            res.json({
                error: err
            })
        } else {
            res.json({
                user: users
            })
        }
    })
}

exports.updateUser = function (req, res, next) {
    var user = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        moviesWatched: [],
        active: true,
    }

    Users.update({_id: req.params.id}, user, function(err, user) {
        if(err) {
            res.json({
                error: err
            })
        } else {
            res.json({
                message: "User updated successfully",
                user: user
            })
        }
    })
}

exports.removeUser = function(req, res, next) {
    Users.delete({_id: req.params.id}, function(err, user) {
        if (err) {
            res.json({
                error: err
            })
        } else {
            res.json({
                message: "User deleted successfully"
            })
        }
    })
}