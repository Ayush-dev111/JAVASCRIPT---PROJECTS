const URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";


const btn= document.querySelector("#search");
const word = document.querySelector(".word h2");
const result = document.querySelector(".result-container");
const speech = document.querySelector(".speech");
const definitionFirst = document.querySelector("#meaning1");
const definitionSecond = document.querySelector("#meaning2");
const example = document.querySelector(".example-sentence")
const audioButton = document.querySelector(".icon");

btn.addEventListener("click", async ()=>{
    let inputWord = document.querySelector("#search-value").value.trim();
    
    if (!inputWord) {
        alert("Please enter a word to search.");
        return;
    }
    try {
        const response = await fetch(`${URL}${inputWord}`);
        if (!response.ok) throw new Error("Word not found.");
        const data = await response.json();


        result.style.display = "block";

        word.textContent = inputWord;
        speech.textContent = "Parts of speech: " + data[0].meanings[0].partOfSpeech;

        definitionFirst.textContent = data[0].meanings[0].definitions[0]?.definition || "No definition available.";
        definitionSecond.textContent = data[0].meanings[0].definitions[1]?.definition || "No definition available.";

        // Handle audio
        let audioSource;
        const phonetics = data[0].phonetics// Check the first phonetics object for audio
        
        for(let i = 0; i< phonetics.length; i++){
            if(phonetics[i].audio){
                audioSource = phonetics[i].audio;
                break;
            }
        }
        if (audioSource) {
            const audio = new Audio(audioSource);
            audioButton.style.display = "inline-block"; // Show audio button
            audioButton.onclick = () => audio.play();
        } else {
            audioButton.style.display = "none"; // Hide audio button
        }

        // Handle examples
        let exampleText;
        const definitions = data[0].meanings[0].definitions

        for(let i = 0; i< definitions.length; i++){
            if(definitions[i].example){
                exampleText = definitions[i].example;
                break;
            }
        }

        if (exampleText) {
            example.textContent = `"${exampleText}"`;
        } else {
            example.textContent = "No example available.";
        }


    } catch (error) {
        alert(error.message);
        result.style.display = "none";
    }
    }
)