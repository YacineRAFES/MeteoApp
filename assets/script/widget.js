import {ville} from "./rechercheVille";
import {getHourlyWeather, getWeekWeather} from "./api/APImeteo";
import {geolocalisation} from "./geo/geolocalisation";
import {getWeatherIcon} from "./utilitaire/weatherData";

document.getElementById('search').addEventListener("click", () => prevision());

async function prevision() {
    const prevision = document.getElementById('output');

    const nameCity = document.getElementById('ville').value.trim();

    var meteoJournee = null;

    if(nameCity){  // Si l'utilisateur a saisi une ville
        const dataVille = await ville(nameCity);
        meteoJournee = await getHourlyWeather(dataVille.lat, dataVille.lon);
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
}