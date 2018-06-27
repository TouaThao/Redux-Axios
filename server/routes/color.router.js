const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(['Red','Yellow','Teal','Orange']);
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.sendStatus(201);
});

module.exports = router;