
var express = require('express');
var router = express.Router();

const { getFirestore, collection, addDoc } = require('firebase/firestore');
const db = require('../DB/db_config');

router.post('/', async function(req, res, next) {
    const { username, email, password, friendsList } = req.body;

    try {
        const docRef = await addDoc(collection(db, 'User_table'), {
            username: username,
            email: email,
            password: password,
            friendsList: friendsList

        });

        console.log('Document written with ID:', docRef.id);

        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error adding document:', error);
        console.log("THEREISNOGOD");
        res.status(500).json({ message: 'Registration failed' });
    }
});

module.exports = router;