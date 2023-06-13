const express = require('express');
const router = express.Router();
const { getFirestore, collection, doc, getDoc, updateDoc, arrayUnion, getDocs } = require('firebase/firestore');
var ok = false;
var okses = false;
const admin = require('firebase-admin');
var serviceAccount = require("../DB/hw3-cc-firebase-adminsdk-rzjn1-0a50814aa4.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

router.post('/', async function(req, res, next) {
  const { email, emailses } = req.body;
  
  if (!email || !emailses) {
    console.log('Invalid email');
    console.log(email);
    console.log(emailses);
    res.status(400).send('Invalid email');
    return;
  }
  
  try {
    console.log('email from cookie:', req.cookies.email);
    console.log('email:', email);
    
    const firestore = getFirestore();
    const usersCollection = collection(firestore, 'User_table');
    
    const querySnapshot = await getDocs(usersCollection);
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.email === email) {
        userData = data;
        userDocToUpdate = doc.ref;
        console.log("db", userData.email)
        ok = true;
      }
      if (data.email === req.cookies.email) {
        usersesData = data; 
        userDocToUpdateSes = doc.ref;
        console.log("db",usersesData.email);
        okses = true;
      }

    });
    
    if (!ok) {
      console.log('User document not found');
      res.status(401).send('User document not found');
      return;
    }
    if (!okses) {
      console.log('User document not found');
      res.status(401).send('User document not found');
      return;
    }
    // Update the document with new data
    await updateDoc(userDocToUpdate, {
     
      friendsList: arrayUnion(req.cookies.email)
    });
    await updateDoc(userDocToUpdateSes, {
     
      friendsList: arrayUnion(userData.email)
    });
    console.log('Friend added');
    res.status(200).send('Friend added successfully');
  } catch (error) {
    console.error('Error adding friend:', error);
    res.status(500).send('Internal server error');
  }
});

admin.app().delete();

module.exports = router;
