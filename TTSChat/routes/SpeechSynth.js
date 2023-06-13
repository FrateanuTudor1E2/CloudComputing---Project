//Speech to text
var express = require('express');
var router = express.Router();

router.post('/', async function(req, res, next) {
    try {
        // console.log("BLOB_o_data: \n");
        // console.log(req.body.audio);
        // res.send(synthesizeText(req.body.audio));
        const responseData = { message: 'Success', data: await synthesizeText(req.body.audio) };

        res.json(responseData);

    } catch (error) {
        console.log(error);
    }
});


async function synthesizeText(audioURL) {
    // Imports the Google Cloud client library
    const speech = require('@google-cloud/speech');

    const client = new speech.SpeechClient();

    /**
     * Calls the Speech-to-Text API on a demo audio file.
     */

    // The path to the remote LINEAR16 file stored in Google Cloud Storage
    // const gcsUri = audioURL;
    // const gcsUri = "https://www.uclass.psychol.ucl.ac.uk/Release2/Conversation/AudioOnly/wav/M_1011_13y10m_1.wav";

    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const audio = {
        // uri: gcsUri,
        content: audioURL,
    };
    const config = {
        // encoding: 'LINEAR16',
        // sampleRateHertz: 16000,
        languageCode: 'en-US',
    };
    const request = {
        audio: audio,
        config: config,
    };

    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
    console.log(`Transcription: ${transcription}`);
    return transcription;
}

module.exports = router;