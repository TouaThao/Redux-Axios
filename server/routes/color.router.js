const express = require('express');
const router = express.Router();
const colors = [{ name: 'Red', count: 2 }, { name: 'Yellow', count: 4 }];

// Get all the colors
router.get('/', (req, res) => {
    res.send(colors);
});

// Add a new color object
router.post('/', (req, res) => {
    console.log(req.body);
    colors.push(req.body);
    res.sendStatus(201);
});

module.exports = router;