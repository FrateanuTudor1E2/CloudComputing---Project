var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    // res.send('respond with a resource');
    res.render('register', { title: 'Register' });
});

module.exports = router;