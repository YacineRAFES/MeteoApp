import {ville} from "./rechercheVille.js";
import {getCurrentWeather} from "./api/APImeteo.js";
import {getWeatherIcon} from "./utilitaire/weatherData.js";
import {ConstructElement7VillesCapital, ConstructElement7VillesCapitalError} from "./constructElement.js";

export async function villesMondeEntierMeteo() {
    const villes = ['Paris', 'New York', 'Tokyo', 'Quebec', 'Londres', 'Berlin', 'Amsterdam'];

    const promesses = villes.map(async villeName => {
        try {

            const dataVille = await ville(villeName);
            const dataWeather = await getCurrentWeather(lat, lon);
            let meteoSituation = await getWeatherIcon(dataWeather.wmoCode);
            return ConstructElement7VillesCapital(dataWeather);
        } catch (error) {
            return ConstructElement7VillesCapitalError(dataWeather);
        }
    })

    Promise.all(promesses)
        .then(() => {
            // Mise à jour du contenu HTML une fois toutes les requêtes terminées
            document.getElementById('villePrincipale').innerHTML = output;
        })
        .catch(error => {
            console.error('Une erreur globale s’est produite :', error);
        });
}