const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send([{name:'Red', count:2},{name:'Yellow', count:4}]);
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.sendStatus(201);
});

module.exports = router;