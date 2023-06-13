//Records audio when the record button is pressed
const record = document.getElementById("recordBtn");
const stop = document.getElementById("stop");
const soundClips = document.querySelector(".contactlist");

const inputbox = document.getElementById("messagebox");

function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsDataURL(blob);
    });
}


if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    console.log("getUserMedia supported.");
    navigator.mediaDevices
        .getUserMedia(
            // constraints - only audio needed for this app
            {
                audio: true,
            }
        )

    // Success callback
    .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.mimeType = 'audio/wav';

        record.onclick = () => {
            mediaRecorder.start();
            console.log(mediaRecorder.state);
            console.log("recorder started");
            record.style.background = "red";
            record.style.color = "black";
        };


        let chunks = [];

        mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
        };

        stop.onclick = () => {
            mediaRecorder.stop();
            console.log(mediaRecorder.state);
            console.log("recorder stopped");
            record.style.background = "";
            record.style.color = "";
        };


        mediaRecorder.onstop = (e) => {
            console.log("recorder stopped");

            // const clipName = prompt("Enter a name for your sound clip");

            // const clipContainer = document.createElement("article");
            // const clipLabel = document.createElement("p");
            // const audio = document.createElement("audio");
            // const deleteButton = document.createElement("button");

            // clipContainer.classList.add("clip");
            // audio.setAttribute("controls", "");
            // deleteButton.innerHTML = "Delete";
            // clipLabel.innerHTML = clipName;

            // clipContainer.appendChild(audio);
            // clipContainer.appendChild(clipLabel);
            // clipContainer.appendChild(deleteButton);
            // soundClips.appendChild(clipContainer);

            const blob = new Blob(chunks, { type: 'audio/wav; codecs=pcm' });
            chunks = [];
            const audioURL = window.URL.createObjectURL(blob);
            // audio.src = audioURL;

            // deleteButton.onclick = (e) => {
            //     let evtTgt = e.target;
            //     evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
            // };

            call_The_api(blob);
        };
    })

    // Error callback
    .catch((err) => {
        console.error(`The following getUserMedia error occurred: ${err}`);
    });
} else {
    console.log("getUserMedia not supported on your browser!");
}

async function call_The_api(audioURL) {

    blobToBase64(audioURL)
        .then((base64String) => {
            const base64Data = base64String.split(',')[1];
            fetch('/SpeechSynth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ audio: base64Data })
                }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    inputbox.value = data.data;
                });
        })
        .catch((error) => {
            console.error("Error converting Blob to Base64:", error);
        });
}