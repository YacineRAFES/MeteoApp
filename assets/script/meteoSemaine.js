import {ville} from "./rechercheVille.js";
import {getWeekWeather} from "./api/APImeteo.js";
import {
    ConstructElementMeteoSemaine
} from "./constructElement.js";
import { geolocalisation } from "./geo/geolocalisation.js";

export async function meteoSemaine() {
    const villeName = await document.getElementById('ville').value.trim();
    let dataVille = null;

    if (villeName) {
        dataVille = await ville(villeName);
    } else if (navigator.geolocation){
        dataVille = await geolocalisation();
    } else {
        console.log("Aucune ville sélectionnée ou géolocalisation refusée.");
        return;
    }

    const dataWeather = await getWeekWeather(dataVille.lat, dataVille.lon);
    return ConstructElementMeteoSemaine(dataWeather);
}
