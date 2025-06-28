// This function initializes a Leaflet map with OpenStreetMap and OpenWeatherMap layers

export function cartographie(lon, lat) {
    return new Promise((resolve, reject) => {
        try {
            const apiKey = CONFIG.OPENWEATHERMAP_API_KEY;

            // Création de la carte Leaflet
            let map = L.map('map').setView([lon, lat], 8);

            // Ajout du fond de carte OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors',
                maxZoom: 18
            }).addTo(map);

            // Ajout des tuiles météo
            L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
                attribution: '© OpenWeatherMap',
                maxZoom: 10
            }).addTo(map);

            // Ajouter un marqueur
            L.marker([lon, lat]).addTo(map);

            resolve(map);
        } catch (error) {
            reject(error);
        }
    });
}