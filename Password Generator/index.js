const btn = document.querySelector(".btn");
const copyBtn = document.querySelector(".display i");

btn.addEventListener("click", () =>{
    const display = document.querySelector("#displayPassword");
    const length = document.querySelector("#length").value;
    const includeSymbols = document.querySelector("#includeSymbols");
    const includeNumbers = document.querySelector("#includeNumbers");
    const includeCaps = document.querySelector("#includeCaps");
    const includeLowerCase = document.querySelector("#includeLowerCase");
    
    
    
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
    
    let characters = "";
    
    if(includeCaps.checked){
        characters += upperCase;
    }
    if(includeLowerCase.checked){
        characters += lowerCase;
    }
    if(includeNumbers.checked){
        characters += numbers;
    }
    if(includeSymbols.checked){
        characters += symbols;
    }
    let password = "";
    
    for(let i = 1; i<=length; i++){
        //password += characters.charAt(Math.floor(Math.random() * characters.length));

        let randomIndex = Math.floor(Math.random()*characters.length);

        password += characters.charAt(randomIndex);
    }
    
        display.value = password;
});


copyBtn.addEventListener("click", ()=>{
    const display = document.querySelector("#displayPassword");
    display.select();
    document.execCommand("copy");
});
