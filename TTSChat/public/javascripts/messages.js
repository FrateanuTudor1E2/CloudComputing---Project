//Used in index.js to speak to the gcloud TTS api
const messagesDiv = document.getElementById('messages');
const originalSetItem = localStorage.setItem;
localStorage.setItem = function(key, value) {
    console.log('setitem', key);
    if (key === 'targetedFriend') {
        const event = new Event('itemUpdated');
        event.key = key;
        event.value = value;
        document.dispatchEvent(event);
        originalSetItem.apply(this, arguments);
    }

};

// Listen for the custom event
document.addEventListener('itemUpdated', function(e) {
    console.log('itemUpdated', e.value);
    const email = getCookie('email')

    fetchMessages(e.value, email)
});
messagesDiv.addEventListener('click', async(event) => {
    if (event.target.id === 'listen') {
        const messageElement = event.target.closest('.message');
        const messageText = messageElement.querySelector('p').textContent;
        console.log(messageText);
        // sendText(messageText);
        playAudioStream(messageText);
    } else if (event.target.id === 'translate') {
        const messageElement = event.target.closest('.message');
        const messageText = messageElement.querySelector('p').textContent;

        resultedTranslation = await translateMessageText(messageText);
        const translatedParagraph = document.createElement('p');
        const break_ = document.createElement('p');
        translatedParagraph.textContent = resultedTranslation;
        break_.textContent = "Translated:   ";
        console.log(resultedTranslation);
        messageElement.appendChild(break_);
        messageElement.appendChild(translatedParagraph);
    }
});



const translateMessageText = async(text) => {
    const response = await fetch('/translateMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text })
    })
    const data = await response.json()
    return data.translation;

};

const playAudioStream = async(text) => {
    const response = await fetch('/SpeechSynthesis', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text })
        })
        .then(response => response.arrayBuffer())
        .then(audioBuffer => {
            // Process the binary audio data as needed
            // For example, you can create an audio element and set the source to the binary data
            const audioElement = new Audio();
            audioElement.src = URL.createObjectURL(new Blob([audioBuffer]));
            audioElement.play();
        })
        .catch(error => {
            // Handle any errors
            console.error('Error:', error);
        });
};

function sendText(text) {
    fetch('/SpeechSynthesis', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text })
        })
        .then(response => response.arrayBuffer())
        .then(wavBuffer => {
            console.log("Received buffer:", wavBuffer)
            const audioContext = new AudioContext();
            const source = audioContext.createBufferSource();
            audioContext.decodeAudioData(wavBuffer, (buffer) => {
                source.buffer = buffer;
                source.connect(audioContext.destination);
                source.start();
            });
        })
        .catch(error => console.error(error));
}

function createMessageDiv(messageText) {
    // Create the div element
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    // Create the p tag and set the messageText
    const pTag = document.createElement('p');
    pTag.textContent = messageText;
    messageDiv.appendChild(pTag);

    // Create the buttons
    const listenButton = document.createElement('button');
    listenButton.id = 'listen';
    listenButton.innerHTML = 'Listen';
    messageDiv.appendChild(listenButton);

    const translateButton = document.createElement('button');
    translateButton.id = 'translate';
    translateButton.innerHTML = 'Translate';
    messageDiv.appendChild(translateButton);

    // Return the created message div
    return messageDiv;
}

const fetchMessages = async(targetFriendEmail, email) => {
    const res = await fetch(`/messages?targetFriendEmail=${targetFriendEmail}&email=${email}`)
    const { messages } = await res.json()
        // console.log('messages \n\n\n\n __________________________\n', messages);
    const container = document.getElementById("messages");
    container.innerHTML = '';
    messages.sort((a, b) => a.Date.seconds - b.Date.seconds);
    messages.forEach((message) => {
        container.appendChild(createMessageDiv(message.MessageText))
    })
}

async function sendMessage(MessageText) {
    const SenderId = getCookie('email')
    const ReceiverId = localStorage.getItem('targetedFriend')
    const body = {
        MessageText,
        SenderId,
        ReceiverId
    }
    console.log('frondend body', body);
    const res = await fetch(`/messages`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    })

}

const send = document.getElementById("send");

send.onclick = () => {
    var message = document.getElementById("messagebox");
    const email = getCookie('email')
    const date = new Date()
    const targetedEmail = localStorage.getItem('targetedFriend');
    sendMessage(message.value)
    fetchMessages(targetedEmail, email)
    message.value = "";
};