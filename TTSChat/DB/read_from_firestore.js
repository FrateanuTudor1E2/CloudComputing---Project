// Get a reference to the Firestore database
var db = firebase.firestore();

// Create a new document to represent the audio file
var audioDocRef = db.collection('audio-files').doc();

// Set the data for the document
audioDocRef.set({
  name: file.name,
  size: file.size,
  url: 'gs://' + snapshot.metadata.bucket + '/' + snapshot.metadata.fullPath
}).then(function() {
  console.log('Created a document for the audio file!');
});
