
const senderEmailInput = document.getElementById('senderEmail');
const emailInput = document.getElementById('email');
const descriptionInput = document.getElementById('description');
const senderVoiceButton = document.getElementById('sender-voice-command');
const emailVoiceButton = document.getElementById('email-voice-command');
const descriptionVoiceButton = document.getElementById('description-voice-command');
const recognition = new webkitSpeechRecognition();

recognition.continuous = true;

senderVoiceButton.addEventListener('click', () => startVoiceRecognition(senderEmailInput));
emailVoiceButton.addEventListener('click', () => startVoiceRecognition(emailInput));
descriptionVoiceButton.addEventListener('click', () => startVoiceRecognition(descriptionInput));

function startVoiceRecognition(inputField) {
    recognition.onresult = function (event) {
        const transcript = event.results[event.results.length - 1][0].transcript;
        inputField.value = transcript;
    };

    recognition.start();
}

sendButton.addEventListener('click', sendMail);

// Function to send the mail (you would need to implement this)
function sendMail() {
    const senderEmail = senderEmailInput.value;
    const recipientEmail = emailInput.value;
    const emailDescription = descriptionInput.value;
    // Implement sending mail logic here
}


// text hover karne py voice aaye


const startButton = document.getElementById('startButton');
        const output = document.getElementById('output');
        const recognition = new window.SpeechRecognition();

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            output.innerHTML = `You said: ${transcript}`;
        };

        startButton.addEventListener('click', () => {
            recognition.start();
            output.innerHTML = 'Listening...';
        });