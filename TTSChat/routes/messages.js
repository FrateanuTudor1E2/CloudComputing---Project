let express = require('express');
let router = express.Router();
const { getFirestore, collection, doc, addDoc, query, onSnapshot, getDocs, Timestamp, orderBy } = require('firebase/firestore');
const db = require('../DB/db_config');


router.post('/', async function(req, res, next) {
    const { MessageText, SenderId, ReceiverId } = req.body;
    console.log('body', req.body);
    const date = new Date()
    const timestamp = Timestamp.fromDate(date)
    try {
        const docRef = await addDoc(collection(db, 'Messages'), {
            MessageText,
            SenderId,
            ReceiverId,
            Date: timestamp
        });

        console.log('Document written with ID:', docRef.id);

        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error adding document:', error);
        console.log("THEREISNOGOD");
        res.status(500).json({ message: 'Registration failed' });
    }
});

router.get('/', async function(req, res, next) {
    const { targetFriendEmail, email } = req.query;
    const firestore = getFirestore();
    const usersCollection = collection(firestore, 'Messages');

    const querySnapshot = await getDocs(usersCollection, orderBy('Date', 'asc'));
    const messages = []

    querySnapshot.forEach((doc) => {

        const data = doc.data();
        console.log('targetFriendEmail', targetFriendEmail);
        console.log('email', email);
        console.log(' doc.ReceiverId', data.ReceiverId);
        console.log(' doc.SenderId', data.SenderId);


        const isValidReceiver = data.ReceiverId === targetFriendEmail || data.ReceiverId === email
        const isValidSender = data.SenderId === targetFriendEmail || data.SenderId === email
        console.log(' isValidReceiver', isValidReceiver);
        console.log(' isValidSender', isValidSender);

        if (isValidReceiver && isValidSender) { // Check if the email matches
            console.log('doc is valid', data);
            messages.push(data)
        } else {
            console.log('DOC IS NOT VALID', data)
        }
    });
    res.json({ messages })
});

module.exports = router;