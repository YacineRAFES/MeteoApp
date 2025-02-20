import { convertionUnixEnDate, convertionUnixEnHeure } from "./utilitaire/utils.js";
import { getWeatherIcon } from "./utilitaire/weatherData.js";

export function getCurrentWeather(lat, lon) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=Europe/Paris&timeformat=unixtime`)
            .then(response => response.json())
            .then(json => {
                resolve({
                    taille:             json.current_weather.weathercode,                    
                    heure:              convertionUnixEnHeure(json.current_weather.time),
                    temperature:        Math.round(json.current_weather.temperature),
                    vitesse_vent:       json.current_weather.windspeed,
                    cycle:              json.current_weather.is_day,
                    desc:        getWeatherIcon(json.current_weather.weathercode).desc,
                    icon:              getWeatherIcon(json.current_weather.weathercode).image
                    
                });
            })
            .catch(error => reject(error));
    });
}

export function getWeekWeather(lat,lon) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timeformat=unixtime`)
            .then(response => response.json())
            .then(json => {
                resolve({
                    meteo:              getWeatherIcon(json.daily.weather_code),
                    taille:             json.daily.weather_code,
                    date:               convertionUnixEnDate(json.daily.time),
                    temperature_max:    Math.round(json.daily.temperature_2m_max),
                    temperature_min:    Math.round(json.daily.temperature_2m_min),
                    precipitation_max:  json.daily.precipitation_probability_max,
                    description:        getWeatherIcon(json.daily.weathercode).desc,
                    image:              getWeatherIcon(json.daily.weathercode).image
                });
            })
            .catch(error => reject(error));
    });
}

export function getHourlyWeather(lat,lon) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation_probability,weather_code,is_day&timeformat=unixtime&temporal_resolution=native&forecast_hours=16`)
            .then(response => response.json())
            .then(json => {
                
                resolve({
                    meteo: getWeatherIcon(json.hourly.weather_code),
                    taille:             json.hourly.weather_code,
                    heure:              convertionUnixEnHeure(json.hourly.time),
                    temperature:        Math.round(json.hourly.temperature_2m),
                    precipitation:      json.hourly.precipitation_probability,
                    cycle:              json.hourly.is_day,
                    description:        getWeatherIcon(json.hourly.weathercode).desc,
                    image:              getWeatherIcon(json.hourly.weathercode).image
                });
            })
            .catch(error => reject(error));
    });
}