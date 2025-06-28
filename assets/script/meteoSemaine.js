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
        if (villeName) {
            dataVille = await ville(villeName);
        } else if (navigator.geolocation) {
            try {
                dataVille = await geolocalisation();
            } catch (geoError) {
                console.warn("Accès à la géolocalisation refusé.");
            }
        }else{
            console.log("Aucune ville sélectionnée ou géolocalisation refusée.");
        }

        const dataWeather = await getWeekWeather(dataVille.lat, dataVille.lon);
        return ConstructElementMeteoSemaine(dataWeather);
    } catch (error) {
        console.error("Erreur lors de la récupération des données météo de la semaine." + error.message);
    }
}