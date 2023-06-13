var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    // res.send('respond with a resource');
    console.log("Here");
    res.render('login', { title: 'Login' });
});

module.exports = router;