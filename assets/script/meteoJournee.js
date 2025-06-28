import { ville } from "./rechercheVille.js";
import { getHourlyWeather } from "./api/APImeteo.js";
import {
    ConstructElementMeteoJournee
} from "./constructElement.js";
import { geolocalisation } from "./geo/geolocalisation.js";

export async function meteoJournee() {
    const villeName = document.getElementById('ville').value.trim();
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
        const dataWeather = await getHourlyWeather(dataVille.lat, dataVille.lon);
        return await ConstructElementMeteoJournee(dataWeather);
    } catch (error) {
        console.error("Erreur lors de la récupération des données météo de la journée." + error.message);
    }
}