const button = document.querySelector(".btn");
const result = document.querySelector(".result");
const flag = document.querySelector("#flag-img")
const country = document.querySelector(".country-name");
const capital = document.querySelector(".capital");
const population = document.querySelector(".population");
const currency = document.querySelector(".currency");
const languages = document.querySelector(".languages-spoken");
const borders = document.querySelector(".borders");
const continent = document.querySelector(".continent");

button.addEventListener("click", async ()=>{
    const input = document.getElementById("input-field");

    let countryName = input.value;
    
result.style.display = "block"
    if(!countryName){
        alert("write a country name");
    }
    try {
        let URL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

        let response = await fetch(URL);

        if(!response.ok){
            throw new Error("cannot find this country.");
        }
        let data = await response.json();

    
        console.log(data);
        console.log(data[0]);
    
        flag.src = data[0].flags.png;
        country.innerHTML = countryName;
        capital.innerHTML = "Capital : "+ data[0].capital[0];
        population.innerHTML = "Population : " + data[0].population;
        currency.innerHTML = "Currency : " + Object.keys(data[0].currencies)[0];
        languages.innerHTML = "Language(s) spoken : " + Object.values(data[0].languages).toString().split(",").join(", ");
        borders.innerHTML = "Border-shared : " + data[0].borders;
        continent.innerHTML = "Continent : " + data[0].continents;

    } catch (error) {
        alert(error);
    }
  
    
});