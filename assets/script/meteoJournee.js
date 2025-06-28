import { ville } from "./rechercheVille.js";
import { getHourlyWeather } from "./api/APImeteo.js";
import {
    ConstructElementMeteoJournee
} from "./constructElement.js";
import { geolocalisation } from "./geo/geolocalisation.js";

export async function meteoJournee() {
    const villeName = document.getElementById('ville').value.trim();
    let dataVille = null;

    if (villeName) {
        dataVille = await ville(villeName);
    } else if (navigator.geolocation){
        dataVille = await geolocalisation();
    } else {
        console.log("Aucune ville sélectionnée ou géolocalisation refusée.");
        return;
    }

    const dataWeather = await getHourlyWeather(dataVille.lat, dataVille.lon);
    return await ConstructElementMeteoJournee(dataWeather);

}