export async function ville(ville){
    return new Promise((resolve, reject) => {
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${ville}&count=1&language=fr&format=json`)
            .then(response => response.json())
            .then(json => {
                resolve({
                    lat: json.results[0].latitude,
                    lon: json.results[0].longitude,
                    country: json.results[0].country_code,
                    name: json.results[0].name
                });
            })
            .catch(error => reject(error));                
    });
}