var storage = firebase.app().storage();

var file = document.getElementById('audio-file').files[0];

var audioRef = storage.ref().child('audio/' + file.name);

audioRef.put(file).then(function(snapshot) {
  console.log('Uploaded a file!');

  audioRef.getDownloadURL().then(function(url) {
    console.log('Download URL:', url);
  });
});
