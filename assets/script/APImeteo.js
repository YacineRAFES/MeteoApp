export function getCurrentWeather(lat, lon) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=Europe/Paris`)
            .then(response => response.json())
            .then(json => {
                resolve({
                    time: json.current_weather.time,
                    temperature: json.current_weather.temperature,
                    wind_speed: json.current_weather.windspeed,
                    is_day: json.current_weather.is_day,
                    wmoCode: json.current_weather.weathercode
                });
            })
            .catch(error => reject(error));
    });
}

export function getWeekWeather(lat,lon) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max`)
            .then(response => response.json())
            .then(json => {
                resolve({
                    day: json.daily.time,
                    wmoCode: json.daily.weather_code,
                    temperature_max: json.daily.temperature_2m_max,
                    temperature_min: json.daily.temperature_2m_min,
                    precipitation_max: json.daily.precipitation_probability_max
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
                    time: json.hourly.time,
                    temperature: json.hourly.temperature_2m,
                    precipitation: json.hourly.precipitation_probability,
                    wmoCode: json.hourly.weather_code,
                    is_day: json.hourly.is_day
                });
            })
            .catch(error => reject(error));
    });
}