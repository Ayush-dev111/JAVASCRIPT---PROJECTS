const URL = "https://zenquotes.io/api/quotes";
const proxyURL = "https://api.allorigins.win/get?url=";


const btn = document.querySelector(".new-quote button");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");

const copy = document.querySelector(".copy-btn");
const speech = document.querySelector(".speech-btn");

btn.addEventListener("click", async () => {
   try {
      const response = await fetch(proxyURL + encodeURIComponent(URL));

      if (!response.ok) {
         throw new Error(`Error fetching quote: ${response.statusText}`);
      }

      const data = await response.json();

      const json = JSON.parse(data.contents);
      console.log(json);

      if (json && json.length > 0) {
        let idx = Math.floor((Math.random() * json.length));
         quote.textContent = json[idx].q; 
         author.textContent = `---${json[idx].a}`; 
      } else {
         quote.textContent = "No quote available";
      }
   } catch (error) {
      console.error("Error fetching quote:", error);
      quote.textContent = "Failed to load quote. Please try again.";
   }
});

copy.addEventListener("click",()=>{
    const quote = document.querySelector(".quote").textContent;
    navigator.clipboard.writeText(quote).then(() => {
        alert("Quote copied to clipboard!");
    })
})

speech.addEventListener("click", ()=>{
    const quote = document.querySelector(".quote").textContent;
    let speak = new SpeechSynthesisUtterance(quote);
    window.speechSynthesis.speak(speak);
})