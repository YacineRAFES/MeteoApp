import { ville } from './rechercheVille.js';
import { getCurrentWeather, getHourlyWeather, getWeekWeather} from "./api/APImeteo.js";
import { getWeatherIcon } from "./utilitaire/weatherData.js";
import {geolocalisation, getCityName} from './utilitaire/geolocalisation.js';
import { cartographie } from "./cartographie.js";
import { CONFIG } from "./api/config.js";

document.getElementById('search').addEventListener("click", () => meteo());
document.addEventListener("DOMContentLoaded", () => {
    villesMondeEntierMeteo();
    meteo();
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

    const nameCity = document.getElementById('ville').value.trim();

    var meteoJournee = null;
    var meteoSemaine = null;
    var meteoActuel = null;
    var dataVille = null;

    if(nameCity){  // Si l'utilisateur a saisi une ville
        dataVille = await ville(nameCity);
        meteoJournee = await getHourlyWeather(dataVille.lat, dataVille.lon);
        meteoSemaine = await getWeekWeather(dataVille.lat, dataVille.lon);
        meteoActuel = await getCurrentWeather(dataVille.lat, dataVille.lon);
        
    } else if(navigator.geolocation){ // Sinon, on utilise la géolocalisation
        dataVille = await geolocalisation();
        meteoJournee = await getHourlyWeather(dataVille.lat, dataVille.lon);
        meteoSemaine = await getWeekWeather(dataVille.lat, dataVille.lon);
        meteoActuel = await getCurrentWeather(dataVille.lat, dataVille.lon);
    }

    if (meteoActuel) {
        const meteoSituation = await getWeatherIcon(meteoActuel.wmoCode);
        const cityName = await getCityName(dataVille.lat, dataVille.lon);
        if (meteoSituation) {
            // Pour l'affichage de la météo actuelle
            actuel.innerHTML = `
        <div class="col-6 bg-white rounded-4">
            <div class="row p-3">
                <div class="col-6 ">
                    <div class="col fs-1 fw-bold">
                        ${cityName.nameCity}
                    </div>
                    <div class="fs-6">ven 11 fév. 2025, 11:11</div>
                    <img style="height: 150px;" src="${meteoSituation.image}" alt="Icône météo"><span class="fs-1 fw-bold">${meteoActuel.temperature}°C</span>
                </div>
                <div class="col-6 mt-2 pe-5">
                    <div class="text-end">
                        <div>${meteoSituation.desc}</div>
                        <div>Humidité: ${meteoActuel.humidite} %</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6 bg-white rounded-4" id="map"></div>`;

            // Affichage de la carte
            cartographie(dataVille.lat, dataVille.lon)
                .then(() => {
                    console.log("Carte affichée avec succès.");
                })
                .catch(error => {
                    console.error("Erreur lors de l'affichage de la carte :", error);
                });
        } else {
            console.error("Erreur lors de la récupération des données météo.");
        }
    }
    
    for (let i = 0; i < meteoJournee.wmoCode.length; i++) {
        const meteoSituation = await getWeatherIcon(meteoJournee.wmoCode[i]);
        output.innerHTML += `
            <div class="col-2">
                <div class="card text-center border-0">
                    <div class="card-body">
                        <h3 class="card-title text-center">${meteoJournee.heure[i]}</h3>
                        <img src="${meteoSituation.image}" class="card-img-top" alt="Icône météo">
                        <p class="card-text text-center fw-bold fs-4">${meteoJournee.temperature[i]}°C</p>
                        <p class="card-text text-center"><i class="bi bi-droplet"></i> ${meteoJournee.precipitation[i]}%</p>
                    </div>
                </div>
            </div>`;
    }
    
    output.classList.remove("blocParDefaut");
    output.classList.remove("bg-light");
    output.classList.add("bg-white");

    for(let i = 0; i < meteoSemaine.wmoCode.length; i++){
        const meteoSituation = await getWeatherIcon(meteoSemaine.wmoCode[i]);
        output2.innerHTML +=`
            <div class="my-2 p-0">
                <div class="card border-0 shadow-lg rounded-4">
                    <div class="card-body p-0 row text-center d-flex align-items-center">
                        <div class="col-3 p-0"><h3> ${ meteoSemaine.date[i] } </h3></div>
                        <div class="col-3 p-0"><i class="bi bi-droplet"></i> ${ meteoSemaine.precipitation_max[i] } %</div>
                        <div class="col-3 p-0"><img src=" ${ meteoSituation.image } " alt="Image du condition de météo"></div>
                        <div class="col-3 p-0 fw-bold fs-4"> ${ meteoSemaine.temperature_min[i] }° / ${ meteoSemaine.temperature_max[i] }°</div>
                    </div>
                </div>
            </div>`;

    }
    output2.classList.remove("blocParDefaut");
    output2.classList.remove("bg-light");
    output2.classList.remove("shadow-lg");

};

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
            let meteoSituation = await getWeatherIcon(dataWeather.wmoCode);
            output += `
                <a href="#" class="col my-2 p-0 mx-1 text-decoration-none align-content-stretch">
                    <div class="card p-2 ps-3 border-0 rounded-4">
                        <div class="fs-5">${name} <span class="fw-bold">(${country})</span></div>
                        <div class="row"> 
                            <div class="col-4">
                                <img src="${meteoSituation.image}" alt="Condition météo" />
                            </div>
                            <div class="col-8">
                                <div class="fs-1 fw-bold">${dataWeather.temperature}°C</div>
                                <div class="fs-6">${meteoSituation.desc}</div>
                            </div>
                        </div>
                    </div>
                </a>
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