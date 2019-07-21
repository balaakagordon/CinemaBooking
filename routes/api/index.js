const passport = require('passport');
const Users = require('../../controllers/UserController');
const auth = require('../auth');

module.exports = function(router) {
    router.post('/auth/signup', Users.createUser);
    router.post('/auth/login', auth.optional, Users.loginUser);
    router.get('/users/', auth.optional, Users.getUsers);
    router.post('/users/', Users.createUser);
    router.get('/users/:id', Users.getUser)
    router.put('/users/:id', auth.required, Users.updateUser)
    router.delete('/users/:id', auth.required, Users.removeUser)
}
