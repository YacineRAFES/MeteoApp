import {ville} from "./rechercheVille.js";
import {getCurrentWeather} from "./api/APImeteo.js";
import {
    ConstructElementMeteoActuelle
} from "./constructElement.js";
import { geolocalisation } from './geo/geolocalisation.js';

export async function meteoActuelle() {
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

    const dataWeather = await getCurrentWeather(dataVille.lat, dataVille.lon);
    return ConstructElementMeteoActuelle(dataVille, dataWeather);
}