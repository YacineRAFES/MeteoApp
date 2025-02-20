//Recupère WMOCODE et retourne l'image et la description
export async function getWeatherIcon(wmoCode){
    try {
        const response = await fetch('./assets/images/weather_code.json');
        const json = await response.json();

        if (!json[wmoCode]) {
            throw new Error(`Code météo inconnu: ${wmoCode}`);
        }

        return {
            image: json[wmoCode].day.image,
            desc: json[wmoCode].day.description
        };
    } catch (error) {
        console.error("Erreur lors de la récupération de l'icône météo :", error);
        return { image: '', desc: 'Description non disponible' };
    }
}