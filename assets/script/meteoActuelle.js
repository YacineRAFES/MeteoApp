import {ville} from "./rechercheVille.js";
import {getCurrentWeather} from "./api/APImeteo.js";
import {
    ConstructElementMeteoActuelle
} from "./constructElement.js";

export async function meteoActuelle(villeName) {

    try {
        const dataVille = await ville(villeName);
        const dataWeather = await getCurrentWeather(dataVille.lat, dataVille.lon);
        return ConstructElementMeteoActuelle(dataVille, dataWeather);
    } catch (error) {
        console.error("Erreur lors de la récupération des données météo.");
    }
}