//Disse konstanter henter URL-parametrene fra vores index.html. Det URL-parameter vi gerne vil have med er ID'et fra vores objekt, hvilket er det vi får ved at sætte nedenstående variabler
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

//Her sætter vi globale konstante variabler, der hiver fat i vores genererede data fra restdb
const medieurl = "https://ruter-80b2.restdb.io/media/";
let rute;

//Denne API-key giver os adgang til vores data i vores restdb
//const myHeaders = {
//    "x-apikey": "602e59735ad3610fb5bb62e6"
//}
const options = {
    headers: {
        'x-apikey': "602e59735ad3610fb5bb62e6"
    }
};

console.log("ID", id);

//Når vi sætter følgende eventlistener på vores document, kan vi sikre os at al vores html-content er loaded, før vi fetch'er vores data og tilføjer JavaScript
document.addEventListener("DOMContentLoaded", loadJSON);


//Her sætter vi en asynkron funktion der fortæller at vi gerne vil fetche dataen fra vores variabel "url". Vi fortæller funktionen at den skal vente med at oprette variablen "respons", til al fetch har hentet vores data
//Variablen "ruter" bruger vi til at lave vores data om til json. Derefter bliver funktionen visRuter kaldt
async function loadJSON() {
    console.log("visDetaljer");


    //    const JSONData = await fetch(`https://ruter-80b2.restdb.io/rest/ruteliste/${id}`, {
    //        headers: myHeaders
    //    });

    const JSONData = await fetch(`https://ruter-80b2.restdb.io/rest/ruteliste/${id}`, options);

    rute = await JSONData.json();

    console.log("Rute: ", rute);
    visRuter(rute);

    document.querySelector("#menuknap").addEventListener("click", toggleMenu);
}


//I denne funktion får vi vist id'et for det objekt vi har haft trykket på. Vi vil gerne have noget content der svarer til det objekt fra vores array der bliver vist. Al dette content er det vi har genereret på restdb, og hentet ind i vores dokument som json
//Derudover har vi tilføjet en eventlistener på den tilbage-knap vi har implementeret på vores singleview, der gør at vores funktion tilbageMenu bliver kaldt, når man klikker på det
function visRuter(x) {
    console.log("visRuter" + rute.naturbillede);
    document.querySelector(".rutebillede").src = medieurl + x.rutebillede;


    document.querySelector(".rutenavn").textContent = rute.rutenavn;
    document.querySelector(".område").textContent = rute.område;
    document.querySelector(".distance").textContent = rute.distance;
    document.querySelector(".txt").textContent = rute.beskrivendetekst;

    document.querySelector("button").addEventListener("click", tilbageRuterne);
}


//Denne funktion gør, at vi går et step tilbage i vores historie, når vi trykker på den tilbage-knap vi har implementeret på vores singleview
function tilbageRuterne() {
    window.history.back();
}


function toggleMenu() {
    console.log("toggleMenu");

    document.querySelector("#menu").classList.toggle("hidden");

    let erSkjult = document.querySelector("#menu").classList.contains("hidden");

    if (erSkjult == true) {
        document.querySelector("#menuknap").textContent = "☰";
    } else {
        document.querySelector("#menuknap").textContent = "X";
    }

}
