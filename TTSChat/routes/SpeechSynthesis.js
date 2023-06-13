// Text to speech

var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    try {
        // speakPlease(text);
    } catch (error) {
        console.log(error);
    }
});

router.post('/', async function(req, res, next) {
    try {
        audioData = await synthesizeSpeech(req.body.text);

        res.set({
            'Content-Type': 'audio/mp3',
        });
        res.send(audioData);

    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred');
    }
});


async function synthesizeSpeech(text) {
    const textToSpeech = require('@google-cloud/text-to-speech');
    const fs = require('fs');
    const util = require('util');

    const client = new textToSpeech.TextToSpeechClient();

    // const textFile = 'Local path to text file, eg. input.txt';
    const outputFile = 'output.mp3';

    const request = {
        input: { text: text },
        voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
        audioConfig: { audioEncoding: 'MP3' },
    };

    const [response] = await client.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(outputFile, response.audioContent, 'binary');
    console.log(response.audioContent);
    console.log(typeof(response.audioContent));
    console.log(`Audio content written to file: ${outputFile}`);

    return response.audioContent;
}

module.exports = router;