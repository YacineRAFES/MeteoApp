export function geolocalisation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => resolve({
                lat: position.coords.latitude,
                lon: position.coords.longitude
            }),
            (error) => reject(error)
        );
    });
}

export function getCityName(lat, lon) {
    return new Promise((resolve, reject) => {
        fetch(`https://us1.api-bdc.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=fr`)
            .then(response => response.json())
            .then(json => {
                resolve({
                    nameCity: json.city
                });
            })
            .catch(error => reject(error));
    });
}