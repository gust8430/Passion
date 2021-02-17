// AL NEDENSTÅENDE KODE ER KOPIERET FRA KAMILLES BABUSHKA-OPGAVE, SÅ NAVNE, LINKS, ID'ER OSV SKAL RETTES TIL


//Disse konstanter henter URL-parametrene fra vores index.html. Det URL-parameter vi gerne vil have med er ID'et fra vores objekt, hvilket er det vi får ved at sætte nedenstående variabler
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

//Her sætter vi globale konstante variabler, der hiver fat i vores genererede data fra restdb
const medieurl = "https://babushka-dd8a.restdb.io/media/";
let ret;

//Denne API-key giver os adgang til vores data i vores restdb
const myHeaders = {
    "x-apikey": "600ec2fb1346a1524ff12de4"
}
console.log("ID", id);

//Når vi sætter følgende eventlistener på vores document, kan vi sikre os at al vores html-content er loaded, før vi fetch'er vores data og tilføjer JavaScript
document.addEventListener("DOMContentLoaded", loadJSON);


//Her sætter vi en asynkron funktion der fortæller at vi gerne vil fetche dataen fra vores variabel "url". Vi fortæller funktionen at den skal vente med at oprette variablen "respons", til al fetch har hentet vores data
//Variablen "retter" bruger vi til at lave vores data om til json. Derefter bliver funktionen visRuter kaldt
async function loadJSON() {
    const JSONData = await fetch(`https://babushka-dd8a.restdb.io/rest/menu/${id}`, {
        headers: myHeaders
    });
    ret = await JSONData.json();

    console.log("Retter", ret);
    visRet(ret);

}

//I denne funktion får vi vist id'et for det objekt vi har haft trykket på. Vi vil gerne have noget content der svarer til det objekt fra vores array der bliver vist. Al dette content er det vi har genereret på restdb, og hentet ind i vores dokument som json
//Derudover har vi tilføjet en eventlistener på den tilbage-knap vi har implementeret på vores singleview, der gør at vores funktion tilbageMenu bliver kaldt, når man klikker på det
function visRet() {
    document.querySelector(".billede").src = medieurl + ret.billede;
    document.querySelector(".ret").textContent = ret.navn;
    document.querySelector(".beskrivelse").textContent = ret.langbeskrivelse;
    document.querySelector(".pris").textContent = `Pris: ${ret.pris},-`;

    document.querySelector("a").addEventListener("click", tilbageMenu);
}


//Denne funktion gør, at vi går et step tilbage i vores historie, når vi trykker på den tilbage-knap vi har implementeret på vores singleview
function tilbageMenu() {
    history.back();
}
