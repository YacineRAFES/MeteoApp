import { ville } from './rechercheVille.js';
import { getCurrentWeather, getHourlyWeather, getWeekWeather} from "./APImeteo.js";

document.getElementById('search').addEventListener("click", () => meteo());
document.addEventListener("DOMContentLoaded", () => {
    villesMondeEntierMeteo();
});

/*
    Fonction qui récupère les données météo de la ville saisie par l'utilisateur
*/
async function meteo(){
    const output = document.getElementById('output');
    const output2 = document.getElementById('output2');
    const actuel = document.getElementById('actuel');
    output.innerHTML = '';
    output2.innerHTML = '';
    actuel.innerHTML = '';

    const nameCity = document.getElementById('ville').value;
    const dataVille = await ville(nameCity);
    const dataHour = await getHourlyWeather(dataVille.lat, dataVille.lon);

    for(let i = 0; i < dataHour.wmoCode.length; i++){
        const imageurl = await getImageWMOCODE(dataHour.wmoCode[i]);
        output.innerHTML+=
            '<div class="col-2">'+
            '<div class="card text-center border-0">'+
            '<div class="card-body">'+
            '<h3 class="card-title text-center">'+ convertionUnixEnHeure(dataHour.time[i])+'</h3>'+
            '<img src="'+ imageurl.image +'" class="card-img-top" alt="card-image">'+
            '<p class="card-text text-center fw-bold fs-4">'+ Math.round(dataHour.temperature[i]) +'°C</p>'+
            '<p class="card-text text-center"><i class="bi bi-droplet"></i> '+ dataHour.precipitation[i]+'%</p>'+
            '</div>'+
            '</div>'+
            '</div>';
    }
    output.classList.remove("blocParDefaut");
    output.classList.remove("bg-light");
    output.classList.add("bg-white");

    const dataWeekly = await getWeekWeather(dataVille.lat, dataVille.lon);

    for(let i = 0; i < dataWeekly.wmoCode.length; i++){
        const imageUrlHebdo = await getImageWMOCODE(dataWeekly.wmoCode[i]);
        output2.innerHTML +=
            '<div class="my-2 p-0">'+
            '<div class="card border-0  shadow-lg rounded-4">'+
            '<div class="card-body p-0 row text-center d-flex align-items-center">'+
            '<div class="col-3 p-0"><h3>'+convertionUnixEnDate(dataWeekly.day[i])+'</h3></div>'+
            '<div class="col-3 p-0"><i class="bi bi-droplet"></i>'+ dataWeekly.precipitation_max[i]+'%</div>'+
            '<div class="col-3 p-0"><img src="'+ imageUrlHebdo.image +'"  alt="Image du condition de météo"></div>'+
            '<div class="col-3 p-0 fw-bold fs-4">'+Math.round(dataWeekly.temperature_min[i])+'° / '+Math.round(dataWeekly.temperature_max[i])+'°</div>'+
            '</div>'+
            '</div>'+
            '</div>';

    }
    output2.classList.remove("blocParDefaut");
    output2.classList.remove("bg-light");
    output2.classList.remove("shadow-lg");

};

/*
    Fonction qui convertit le temps Unix en heure
*/
function convertionUnixEnHeure(unixtime){
    let unix = unixtime;

    var date = new Date(unix * 1000);

    var hours = date.getHours();

    var minutes = "0" + date.getMinutes();

    var formattedTime = hours + ':' + minutes.substring(-2);

    return formattedTime;
}

/*
    Fonction qui récupère l'image et la description de la météo
*/
async function getImageWMOCODE(wmoCode){
    let wmocode = wmoCode;
    const response = await fetch('./assets/images/weather_code.json');

    const json = await response.json();

    const imageurl = json[wmocode].day.image;
    const description = json[wmocode].day.description;

    return {image: imageurl, desc: description};
}

/*
    Fonction qui convertit le temps Unix en date
*/
function convertionUnixEnDate(unixdate){
    const jourAujourd = new Date().toLocaleString('FR-fr', {  weekday: 'long' });

    let unix = unixdate;
    var date = new Date(unix*1000);

    if (isNaN(date.getTime())) {
        console.error("Date non valide :", date);
        return "Date non valide";
    }

    const getJour =  new Intl.DateTimeFormat("fr-FR", {weekday: "long"}).format(date);

    let jourSemaine = null;

    if(jourAujourd === getJour){
        jourSemaine = "Aujourd'hui";
    }else{
        jourSemaine = new Intl.DateTimeFormat("fr-FR", {weekday: "long"}).format(date);
    }

    return jourSemaine;
}

/* 
    Fonction qui récupère les données météo de plusieurs villes du monde entier
*/
async function villesMondeEntierMeteo() {
    const villes = ['Paris', 'New York', 'Tokyo', 'Quebec', 'Londres', 'Berlin', 'Amsterdam'];
    let output = '';

    const promesses = villes.map(async villeName => {
        try {
            const dataVille = await ville(villeName);
            const {lat, lon, country, name} = dataVille;
            const dataWeather = await getCurrentWeather(lat, lon);
            const {temperature, wmoCode} = dataWeather; // Extraction de weathercode
            const meteo = await getImageWMOCODE(wmoCode);
            output += `
                <div class="col my-2 p-0 mx-1">
                    <div class="card p-2 ps-3 border-0 rounded-4">
                        <div class="fs-5">${name} (${country})</div>
                        <div class="row">
                            <div class="col-4">
                                <img src="${meteo.image}" alt="Condition météo" />
                            </div>
                            <div class="col-8">
                                <div class="fs-1">${Math.round(temperature)}°C</div>
                                <div class="fs-6">${meteo.desc}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            output += `
                <div class="col my-2 p-0">
                    <div class="card p-2 ps-3 border-0 shadow-lg rounded-4 bg-danger text-white">
                        <div class="fs-5">${villeName}</div>
                        <div class="fs-6">Erreur de récupération des données.</div>
                    </div>
                </div>
            `;
        }
    });

    Promise.all(promesses)
        .then(() => {
            // Mise à jour du contenu HTML une fois toutes les requêtes terminées
            document.getElementById('villePrincipale').innerHTML = output;
        })
        .catch(error => {
            console.error('Une erreur globale s’est produite :', error);
        });
}