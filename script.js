// AL NEDENSTÅENDE KODE ER KOPIERET FRA KAMILLES BABUSHKA-OPGAVE, SÅ NAVNE, LINKS, ID'ER OSV SKAL RETTES TIL



//Her sætter vi globale konstante variabler, der hiver fat i vores genererede data fra restdb
const url = "https://babushka-dd8a.restdb.io/rest/menu";
const medieurl = "https://babushka-dd8a.restdb.io/media/";

//Denne variabel hiver fat i vores h2'er i vores html-dokument, da vi skal kunne ændre textcontent når vi filtrere, for at fortælle brugeren hvilken knap der er blevet trykket på
const header = document.querySelector("header h2");

//Denne API-key giver os adgang til vores data i vores restdb
const options = {
    headers: {
        'x-apikey': "600ec2fb1346a1524ff12de4"
    }
};


//Når vi sætter følgende eventlistener på vores document, kan vi sikre os at al vores html-content er loaded, før vi fetch'er vores data og tilføjer JavaScript
document.addEventListener("DOMContentLoaded", start)

//Disse globale variabler er vigtige at få sat, så vi senere kan bruge dem
let retter;
let filter = "alle";

//Denne funktion bliver kaldt, når al vores DOM-content er loaded
//Her sætter vi en variabel, der tager fat i vores filtreringsknapper. Ved at sætte denne variabel, skal vi ikke skrive en hel lang sætning hver gang vi ønsker at få fat i vores knapper
//Derudover sætter vi en eventlistener på hver af disse knapper, da vi gerne vil kalde en funktion, når der klikkes på en af dem
//Denne funktion kalder til sidst også en ny funktion, kaldet hentData, der sørger for at fetch'e al vores data fra restdb
function start() {
    document.querySelector("#menuknap").addEventListener("click", toggleMenu);

    const filterKnapper = document.querySelectorAll("nav a");

    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerRetter));
    hentData();
}


//Denne funktion bliver kaldt når man klikker på en af filtreringsknapperne
//Her hiver vi fat i vores dataset, der er det der gør at alle vores ruter bliver filtreret udfra de kategorier vi har valgt
//Derudover ændrer vi textcontent på "this", der gør at overskriften skifter i takt med de knapper man klikker på
//Til sidst tilføjer vi .valgt til den knap vi har trykket på. Denne klasse er stylet således, at den knap man har valgt, ændrer farve. Dette er for at fremme brugervenligheden
//.valgt bliver derudover fjernet fra den knap der lige har haft den
//Til sidst kalder denne funktion også en anden funktion kaldet visRuter, der gør at vores array med alle vores objekter bliver vist i et loop-view
function filtrerRetter() {
    filter = this.dataset.retter;
    console.log("Retter", filter);
    document.querySelector(".valgt").classList.remove("valgt");
    this.classList.add("valgt");
    header.textContent = this.textContent;



    visRuter();
}

//Her sætter vi en asynkron funktion der fortæller at vi gerne vil fetche dataen fra vores variabel "url". Vi fortæller funktionen at den skal vente med at oprette variablen "respons", til al fetch har hentet vores data
//Variablen "retter" bruger vi til at lave vores data om til json. Derefter bliver funktionen visRuter kaldt
async function hentData() {
    const respons = await fetch(url, options);
    retter = await respons.json();
    console.log("Retter", retter);
    visRuter();
}

//I denne funktion sætter vi en for.Each på vores ruter. Det betyder at for hver rute, vil vi gerne have noget content der svarer til det objekt fra vores array der bliver vist. Al dette content er det vi har genereret på restdb, og hentet ind i vores dokument som json
//Al dette content "append'er" vi i vores main-tag via vores konstante variabel "klon". Det gør at alle vores ruter bliver implementeret på vores site
//Derudover har vi tilføjet en eventlistener på vores article-tag, der gør at vores funktion visDetaljer bliver kaldt, når man klikker på det
function visRuter() {
    const main = document.querySelector("main");
    const template = document.querySelector("template").content;
    main.textContent = "";

    retter.forEach(ret => {
        console.log("Retter");
        if (filter == ret.kategori || filter == "alle") {
            const klon = template.cloneNode(true);
            klon.querySelector(".billede").src = medieurl + ret.billede;
            klon.querySelector(".ret").textContent = ret.navn;
            klon.querySelector(".beskrivelse").textContent = ret.kortbeskrivelse;
            klon.querySelector(".pris").textContent = `Pris: ${ret.pris},-`;
            klon.querySelector("article").addEventListener("click", () => visDetaljer(ret));
            main.appendChild(klon);
        }
    })
}


//Denne funktion tager fat i id'et for præcis det objekt vi har klikket på, og kan, ved hjælp af html-siden til vores singleview, vise al den rigtige content for dette objekt
function visDetaljer(hvad) {
    location.href = `02-detalje.html?id=${hvad._id}`;
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