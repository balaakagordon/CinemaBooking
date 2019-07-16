const Users = require('../services/userDatabseService');

exports.createUser = function (req, res, next) {
    var user = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        moviesWatched: [],
        active: true,
    }

    Users.create(user, function(err, user) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            message: "User created successfully"
        })
    })
}

exports.getUsers = function(req, res, next) {
    Users.get({}, function(err, users) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            users: users
        })
    })
}

exports.getUser = function(req, res, next) {
    Users.getById({_id: req.params.id}, function(err, users) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            users: users
        })
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
        }
        res.json({
            message: "User updated successfully"
        })
    })
}

exports.removeUser = function(req, res, next) {
    Users.delete({_id: req.params.id}, function(err, user) {
        if (err) {
            res.json({
                error: err
            })
        }
        res.json({
            message: "Hero deleted successfully"
        })
    })
}