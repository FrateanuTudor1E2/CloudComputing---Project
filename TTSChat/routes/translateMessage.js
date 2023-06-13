var express = require('express');
var router = express.Router();

const projectId = 'atomic-segment-382714';

// Imports the Google Cloud client library
const { Translate } = require('@google-cloud/translate').v2;

// Instantiates a client
const translate = new Translate({ projectId });

async function translateText(text) {

    // The target language
    const target = 'ro';

    // Translates some text into Russian
    const [translation] = await translate.translate(text, target);
    console.log(`Text: ${text}`);
    console.log(`Translation: ${translation}`);
    return translation;
}


router.post('/', async function(req, res, next) {
    try {
        translation = await translateText(req.body.text);
        res.json({ translation });
    } catch {
        console.log(error);
        res.status(500).send('An error occurred');
    }
})

module.exports = router;