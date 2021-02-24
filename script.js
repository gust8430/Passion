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


//Når vi sætter følgende eventlistener på vores document, kan vi sikre os at al vores html-content er loaded, før vi fetch'er vores data og tilføjer JavaScript. Når DOMContent er loaded, kører funktionen start
document.addEventListener("DOMContentLoaded", start)

//Disse globale variabler er vigtige at få sat, så vi senere kan bruge dem i visRuter
let ruter;
let filter = "alle";

//Denne funktion bliver kaldt, når al vores DOM-content er loaded
//Variablen tager fat i vores filtreringsknapper
//Eventlistener bliver tilføjet på hver af disse knapper, da vi gerne vil kalde en funktion, når der klikkes på en af dem
//Kalder funktionen hentData
function start() {
    console.log("start");
    document.querySelector("#menuknap").addEventListener("click", toggleMenu);

    const filterKnapper = document.querySelectorAll("nav button");

    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerRuter));
    hentData();
}


//Denne funktion bliver kaldt når man klikker på en af filtreringsknapperne
//Alle vores ruter bliver filtreret udfra de kategorier vi har valgt
//Textcontent ændres på "this", der gør at overskriften skifter i takt med de knapper man klikker på
//.valgt bliver fjernet fra alle knapper
//Tilføjer .valgt til den knap vi har trykket på. For at fremme brugervenligheden
//Kalder funtionen visRuter
function filtrerRuter() {
    filter = this.dataset.beliggenhed;
    console.log("Ruter", filter);
    document.querySelector(".valgt").classList.remove("valgt");
    this.classList.add("valgt");
    console.log(this.textContent);
    header.textContent = this.textContent;



    visRuter();
}

//Asynkron funktion der fetcher dataen fra vores variabel "url"
//Den skal vente med at oprette variablen "respons", til fetch har hentet vores data
//Vores array bliver vist i et loop-view
//Laver data om til json
//Funktionen visRuter bliver kaldt
async function hentData() {
    const respons = await fetch(url, options);
    ruter = await respons.json();
    console.log("Ruter", ruter);
    visRuter();
}

//for.Each på vores ruter.
//Content bliver append'et til main-taget
//Eventlistener på vores article-tag, der gør at vores funktion visDetaljer bliver kaldt, når man klikker på det
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
            klon.querySelector(".loopart").addEventListener("click", () => visDetaljer(rute));
            klon.querySelector(".knap").addEventListener("click", () => visDetaljer(rute));
            main.appendChild(klon);
        }
    })
}


//Tager fat i id'et for det objekt der er klikket på og viser i singleview
function visDetaljer(prut) {
    console.log("visDetaljer");
    location.href = `detalje.html?id=${prut._id}`;
}

//Man kan "toggle" mellem om vores menu skal være åben eller lukket
//Textcontentet på burgermenuikonet ændres alt efter om menuen er åben eller lukket
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
