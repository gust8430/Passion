//Her sætter vi globale konstante variabler, der hiver fat i vores genererede data fra restdb
const url = "https://ruter-80b2.restdb.io/rest/ruteliste";
const medieurl = "https://ruter-80b2.restdb.io/media/";

//Denne variabel hiver fat i vores h2'er i vores html-dokument, da vi skal kunne ændre textcontent når vi filtrere, for at fortælle brugeren hvilken knap der er blevet trykket på

const header = document.querySelector("header h2");
const main = document.querySelector("main");
const template = document.querySelector("template").content;


//Denne API-key giver os adgang til vores data i vores restdb
const options = {
    headers: {
        'x-apikey': "602e59735ad3610fb5bb62e6"
    }
};


//Når vi sætter følgende eventlistener på vores document, kan vi sikre os at al vores html-content er loaded, før vi fetch'er vores data og tilføjer JavaScript
document.addEventListener("DOMContentLoaded", start)

//Disse globale variabler er vigtige at få sat, så vi senere kan bruge dem
let ruter;
let filter = "alle";

//Denne funktion bliver kaldt, når al vores DOM-content er loaded
//Her sætter vi en variabel, der tager fat i vores filtreringsknapper. Ved at sætte denne variabel, skal vi ikke skrive en hel lang sætning hver gang vi ønsker at få fat i vores knapper
//Derudover sætter vi en eventlistener på hver af disse knapper, da vi gerne vil kalde en funktion, når der klikkes på en af dem
//Denne funktion kalder til sidst også en ny funktion, kaldet hentData, der sørger for at fetch'e al vores data fra restdb
function start() {
    console.log("start");
    document.querySelector("#menuknap").addEventListener("click", toggleMenu);

    const filterKnapper = document.querySelectorAll("nav button");

    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerRuter));
    hentData();
}


//Denne funktion bliver kaldt når man klikker på en af filtreringsknapperne
//Her hiver vi fat i vores dataset, der er det der gør at alle vores ruter bliver filtreret udfra de kategorier vi har valgt
//Derudover ændrer vi textcontent på "this", der gør at overskriften skifter i takt med de knapper man klikker på
//Til sidst tilføjer vi .valgt til den knap vi har trykket på. Denne klasse er stylet således, at den knap man har valgt, ændrer farve. Dette er for at fremme brugervenligheden
//.valgt bliver derudover fjernet fra den knap der lige har haft den
//Til sidst kalder denne funktion også en anden funktion kaldet visRuter, der gør at vores array med alle vores objekter bliver vist i et loop-view


function filtrerRuter() {
    filter = this.dataset.beliggenhed;
    console.log("Ruter", filter);
    document.querySelector(".valgt").classList.remove("valgt");
    this.classList.add("valgt");
    console.log(this.textContent);
    header.textContent = this.textContent;



    visRuter();
}

//Her sætter vi en asynkron funktion der fortæller at vi gerne vil fetche dataen fra vores variabel "url". Vi fortæller funktionen at den skal vente med at opruter variablen "respons", til al fetch har hentet vores data
//Variablen "ruter" bruger vi til at lave vores data om til json. Derefter bliver funktionen visRuter kaldt
async function hentData() {
    const respons = await fetch(url, options);
    ruter = await respons.json();
    console.log("Ruter", ruter);
    visRuter();
}

//I denne funktion sætter vi en for.Each på vores ruter. Det betyder at for hver rute, vil vi gerne have noget content der svarer til det objekt fra vores array der bliver vist. Al dette content er det vi har genereret på restdb, og hentet ind i vores dokument som json
//Al dette content "append'er" vi i vores main-tag via vores konstante variabel "klon". Det gør at alle vores ruter bliver implementeret på vores site
//Derudover har vi tilføjet en eventlistener på vores article-tag, der gør at vores funktion visDetaljer bliver kaldt, når man klikker på det
function visRuter() {

    main.textContent = "";

    ruter.forEach(rute => {
        console.log("Rute");
        console.log("beliggenhed:" + rute.beliggenhed);
        console.log("filter" + filter);
        if (filter == rute.beliggenhed || filter == "alle") {
            const klon = template.cloneNode(true);
            console.log("er i for.each");
            klon.querySelector(".naturbillede").src = medieurl + rute.naturbillede;
            klon.querySelector(".rutenavn").textContent = rute.rutenavn;
            klon.querySelector(".område").textContent = rute.område;
            klon.querySelector(".distance").textContent = rute.distance;
            klon.querySelector("article").addEventListener("click", () => visDetaljer(rute));
            main.appendChild(klon);
        }
    })
}


//Denne funktion tager fat i id'et for præcis det objekt vi har klikket på, og kan, ved hjælp af html-siden til vores singleview, vise al den rigtige content for dette objekt
function visDetaljer(prut) {
    console.log("visDetaljer");
    location.href = `detalje.html?id=${prut._id}`;
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
