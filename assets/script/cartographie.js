import {CONFIG} from "./api/config.js";
import * as L from "../../dist/leaflet.js";

export function cartographie(lon, lat) {
    const apiKey = CONFIG.OPENWEATHERMAP_API_KEY;

// Création de la carte Leaflet
    var map = L.map('map').setView([lon,lat], 8); // Paris

// Ajout du fond de carte OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

// Ajout des tuiles météo (précipitations par exemple)
    L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
        attribution: '© OpenWeatherMap',
        maxZoom: 10
    }).addTo(map);
}
