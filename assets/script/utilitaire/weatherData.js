//Recupère WMOCODE et retourne l'image et la description
export async function getWeatherIcon(wmoCode){
    try {
        let wmocode = wmoCode;
        const response = await fetch('/assets/images/weather_code.json');

        const json = await response.json();

        console.log(wmoCode);
        const imageurl = json[wmocode].day.image;
        console.log("getWeatherIcon"+imageurl);
        const description = json[wmocode].day.description;

        return {image: imageurl, desc: description};
    }catch(error){
        console.error("Erreur lors de la récupération de l'icône météo: " + wmoCode + ", message erreur: " + error.message);
        throw error;
    }
}