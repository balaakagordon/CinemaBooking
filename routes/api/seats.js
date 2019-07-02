const express = require('express');
const seats = require('../../Seats');

const router = express.Router();

router.get('/', (req, res) => {
    res.json(seats);
})

module.exports = router;