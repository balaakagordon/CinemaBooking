const express = require('express');
const uuid = require('uuid');
const users = require('../../Users');

const router = express.Router();

router.get('/', (req, res) => {
    res.json(users);
});

router.get('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id));
    if(found) {
        res.json(users.filter(user => user.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `No user with the id of ${req.params.id}`});
    }
});

router.post('/', (req, res) => {
    let newUser = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active',
    }

    if( !newUser.name || !newUser.name ) {
        return res.status(400).json({ msg: 'Please submit your name and email' })
    }
    users.push(newUser);

    res.status(201).json(users);
})

router.put('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id));

    if (found) {
        const updateUser = req.body;
        users.forEach(user => {
            if(user.id === parseInt(req.params.id)) {
                user.name = updateUser.name ? req.body.name : user.name,
                user.email = updateUser.email ? req.body.email : user.email
                return res.status(200).json(
                    {
                        msg: 'User updated',
                        data: user
                    }
                );
            }
        })
    } else {
        res.status(400).json({msg: `No user with the id of ${req.params.id}`});
    }
})

router.delete('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id));
    if(found) {
        res.json(
            {
                msg: 'User deleted',
                users: users.filter(user => user.id !== parseInt(req.params.id))});
    } else {
        res.status(400).json({msg: `No user with the id of ${req.params.id}`});
    }
});

module.exports = router;
