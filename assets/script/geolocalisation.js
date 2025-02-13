export function geolocalisation() {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    let crd = position.coords;
                    resolve({
                        lat: crd.latitude,
                        lon: crd.longitude
                    });
                },
                error => reject(error) // Gère les erreurs éventuelles
            );
        } else {
            reject(new Error("La géolocalisation n'est pas supportée par ce navigateur."));
        }
    });
}


navigator.geolocation.getCurrentPosition(geolocalisation);
