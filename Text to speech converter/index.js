// let speech = new SpeechSynthesisUtterance();
// let voices = [];
// let voiceSelect = document.querySelector("select");
// const btn = document.querySelector("button");

// window.speechSynthesis.onvoiceschanged = () =>{
//     voices = window.speechSynthesis.getVoices();
//     speech.voice = voices[0];

//    voices.forEach((voice,i) =>(voiceSelect.options[i] = new Option(voice.name,i)));
// }

// voiceSelect.addEventListener("change", ()=>{
//     speech.voice = voices[voiceSelect.value];
// })
// btn.addEventListener("click", ()=>{
//     speech.text = document.querySelector("textarea").value;
        // if (!text) {
        //     alert("Please enter some text to speak.");
        //     return;
        // }
//     window.speechSynthesis.speak(speech);
// });


let speech = new SpeechSynthesisUtterance();
let voices = [];
const voiceSelect = document.querySelector("select");
const btn = document.querySelector("button");

function populateVoices() {
    voices = window.speechSynthesis.getVoices();

    if (voices.length === 0) {
        alert("No voices found. Please check if text-to-speech is supported in your browser.");
        return;
    }

    voiceSelect.innerHTML = ""; // Clear existing options
    voices.forEach((voice, i) => {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = `${voice.name} (${voice.lang}) ${voice.default ? " [Default]" : ""}`;
        voiceSelect.appendChild(option);
    });

    // Set the default voice
    speech.voice = voices[0];
}

// Populate voices when available
if ('speechSynthesis' in window) {
    populateVoices();
    window.speechSynthesis.onvoiceschanged = populateVoices;
} else {
    alert("Text-to-Speech is not supported in your browser.");
}

// Change the voice based on selection
voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

// Speak the text when the button is clicked
btn.addEventListener("click", () => {
    const text = document.querySelector("textarea").value;
    if (!text) {
        alert("Please enter some text to speak.");
        return;
    }
    speech.text = text;
    window.speechSynthesis.speak(speech);
});
