var express = require('express');
var router = express.Router();
const { getFirestore, collection, doc, getDoc, updateDoc, arrayUnion, getDocs } = require('firebase/firestore');


/* GET users listing. */
router.get('/', async(req, res) => {
    const { userEmail } = req.query
        // res.send('respond with a resource');
    console.log("email", userEmail);
    const firestore = getFirestore();
    const usersCollection = collection(firestore, 'User_table');

    const querySnapshot = await getDocs(usersCollection);
    var ok = false;
    let userData; // Declare an empty variable here
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.email === userEmail) { // Check if the email matches
            userData = data; // Assign the value
            console.log("db", userData.email);
            ok = true;
            res.json({ friends: data.friendsList })
        }
    });

});

module.exports = router;