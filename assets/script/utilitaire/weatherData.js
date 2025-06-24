//Recupère WMOCODE et retourne l'image et la description
export async function getWeatherIcon(wmoCode){
    let wmocode = wmoCode;
    const response = await fetch('/assets/images/weather_code.json');

    const json = await response.json();

    const imageurl = json[wmocode].day.image;
    const description = json[wmocode].day.description;

    return {image: imageurl, desc: description};
}