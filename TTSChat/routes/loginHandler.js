var express = require('express');
var router = express.Router();
router.get('/', (req, res) => {
    res.send('Hello from /loginHandler');
  });
  
const { getFirestore, collection, doc, getDoc, getDocs } = require('firebase/firestore');
const admin = require('firebase-admin');
var serviceAccount = require("../DB/hw3-cc-firebase-adminsdk-rzjn1-0a50814aa4.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
router.post('/', async function(req, res, next){
    const { email, password } = req.body;

    try {
      const firestore = getFirestore();
      const usersCollection = collection(getFirestore(), 'User_table');
      const userDoc = await getDoc(doc(usersCollection, email));
      const querySnapshot = await getDocs(usersCollection);
      var ok = false;
      let userData;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.email === email) { // Check if the email matches
          userData = data; 
          console.log("db",userData.email);
          ok = true;
        }
      });
      if (ok == true) {
        if (userData && userData.password.trim() === password.trim()) { 
          // User exists and credentials are correct
          console.log("login successful");
          res.status(200).json({ status: 'success', username: userData.username, sesemail: userData.email });
        } else {
          // User exists, but credentials are incorrect
          console.log("Invalid credentials");
          res.status(401).send('Invalid credentials');
        }
      } else {
        // User with the provided email does not exist
        console.log('There is no account with that email');
        console.log("form",email);
        console.log("db2",userData.email);
        res.status(401).send('There is no account with that email');
      }
    } catch (error) {
      console.error('Error checking credentials: ', error);
      res.status(500).send('Internal server error');
    }
    
});
admin.app().delete();
module.exports = router;
