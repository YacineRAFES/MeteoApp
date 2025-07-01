import { convertionUnixEnDate, convertionUnixEnHeure } from "../utilitaire/convertion.js";
import { getWeatherIcon } from "../utilitaire/weatherData.js";

export async function getCurrentWeather(lat, lon) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,weather_code,wind_speed_10m&timeformat=unixtime`);
        const json = await response.json();

        const weatherIcon = await getWeatherIcon(json.current.weather_code);

        return {
            taille:             json.current.weather_code,
            heure:              convertionUnixEnHeure(json.current.time),
            unixtime:           json.current.time,
            temperature:        Math.round(json.current.temperature_2m),
            vitesse_vent:       json.current.wind_speed_10m,
            cycle:              json.current.is_day,
            icon:               weatherIcon.image,
            desc:               weatherIcon.desc,
            humidite:           json.current.relative_humidity_2m,
            precipitation:      json.current.precipitation
        };
    } catch (error) {
        throw error;
    }
}

export async function getWeekWeather(lat,lon) {
    try{
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timeformat=unixtime`);
        const json = await response.json();

        return {
            date:               json.daily.time.map(time => convertionUnixEnDate(time)),
            temperature_max:    json.daily.temperature_2m_max.map(tempmax => Math.round(tempmax)),
            temperature_min:    json.daily.temperature_2m_min.map(tempmin => Math.round(tempmin)),
            precipitation_max:  json.daily.precipitation_probability_max,
            wmoCode:            json.daily.weather_code
        }
    }catch (error) {
        console.log("getWeekWeather" + error);
        throw error;
    }
}

export async function getHourlyWeather(lat,lon) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation_probability,weather_code&timeformat=unixtime&temporal_resolution=native&forecast_hours=16`);
        const json = await response.json();

        return {
            heure:              json.hourly.time.map(time => convertionUnixEnHeure(time)),
            temperature:        json.hourly.temperature_2m.map(temp => Math.round(temp)),
            precipitation:      json.hourly.precipitation_probability,
            wmoCode:            json.hourly.weather_code
        }
    }catch (error) {
        console.log("getHourlyWeather" + error);
        throw error;
    }
}