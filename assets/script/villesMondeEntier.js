import {ville} from "./rechercheVille.js";
import {getCurrentWeather} from "./api/APImeteo.js";
import {ConstructElement7VillesCapital, ConstructElement7VillesCapitalError} from "./constructElement.js";

export async function villesMondeEntierMeteo() {
    const villes = ['Paris', 'New York', 'Tokyo', 'Quebec', 'Londres', 'Berlin', 'Amsterdam'];

    const promesses = villes.map(async villeName => {
        try {
            const dataVille = await ville(villeName);
            const dataWeather = await getCurrentWeather(dataVille.lat, dataVille.lon);
            return ConstructElement7VillesCapital(dataVille, dataWeather);
        } catch (error) {
            return ConstructElement7VillesCapitalError(dataWeather);
        }
    })

    Promise.all(promesses)
        .then(elements => {
            const container = document.getElementById('villePrincipale');
            container.innerHTML = ''; // Vide avant de remplir
            elements.forEach(el => container.appendChild(el));
        })
        .catch(error => {
            console.error('Une erreur globale s’est produite :', error);
        });
}