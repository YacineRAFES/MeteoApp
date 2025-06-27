import {ville} from "./rechercheVille.js";
import {getWeekWeather} from "./api/APImeteo.js";
import {
    ConstructElementMeteoSemaine
} from "./constructElement.js";
import { geolocalisation } from "./geo/geolocalisation.js";

export async function meteoSemaine() {
    const villeName = await document.getElementById('ville').value.trim();
    let dataVille = null;

    try {
        if(villeName) {
            dataVille = await ville(villeName);
        }else if(await navigator.geolocation){
            dataVille = await geolocalisation();
        }

        const dataWeather = await getWeekWeather(dataVille.lat, dataVille.lon);
        return ConstructElementMeteoSemaine(dataVille, dataWeather);
    } catch (error) {
        console.error("Erreur lors de la récupération des données météo de la semaine." + error.message);
    }
}