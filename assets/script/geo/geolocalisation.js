export function geolocalisation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("La géolocalisation n'est pas supportée par votre navigateur."));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => resolve({
                lat: position.coords.latitude,
                lon: position.coords.longitude
            }),
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        reject(new Error("L'utilisateur a refusé l'accès à la géolocalisation."));
                        break;
                    case error.POSITION_UNAVAILABLE:
                        reject(new Error("Les informations de localisation ne sont pas disponibles."));
                        break;
                    case error.TIMEOUT:
                        reject(new Error("La demande de géolocalisation a expiré."));
                        break;
                    default:
                        reject(new Error("Une erreur inconnue est survenue lors de la récupération de la position."));
                }
            }
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