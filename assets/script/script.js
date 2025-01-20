document.getElementById('search').addEventListener("click", () => meteo());
document.addEventListener("DOMContentLoaded", () => {
    villesMondeEntierMeteo();
});

async function meteo(){
    const output = document.getElementById('output');
    const output2 = document.getElementById('output2');
    const actuel = document.getElementById('actuel');
    output.innerHTML = '';
    output2.innerHTML = '';
    actuel.innerHTML = '';

    const nameCity = document.getElementById('ville').value;
    //fetch  the location of city
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${nameCity}&count=1&language=fr&format=json`);
    const json = await response.json();
    console.log(json);
    const data = json.results[0];
    const lat = data.latitude;
    const lon = data.longitude;
    const name = data.name;
    const country = data.country_code;
    console.log(lat, lon);



    const response2 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation_probability,weather_code&timeformat=unixtime&temporal_resolution=native&forecast_hours=16`);
    const json2 = await response2.json();
    const taille = json2.hourly.time.length;
    console.log(taille);
    const unix = json2.hourly.time;
    const temperature = json2.hourly.temperature_2m;
    const precipitation = json2.hourly.precipitation_probability;
    const wmoCode = json2.hourly.weather_code;

    for(let i = 0; i < taille; i++){
        const imageurl = await getImageWMOCODE(wmoCode[i]);
        output.innerHTML+=
            '<div class="col-2">'+
            '<div class="card text-center border-0">'+
            '<div class="card-body">'+
            '<h3 class="card-title text-center">'+ convertionUnixEnHeure(unix[i])+'</h3>'+
            '<img src="'+ imageurl.image +'" class="card-img-top" alt="card-image">'+
            '<p class="card-text text-center fw-bold fs-4">'+ Math.round(temperature[i]) +'°C</p>'+
            '<p class="card-text text-center"><i class="bi bi-droplet"></i> '+ precipitation[i]+'%</p>'+
            '</div>'+
            '</div>'+
            '</div>';
    }
    output.classList.remove("blocParDefaut");
    output.classList.remove("bg-light");
    output.classList.add("bg-white");

    const responseHebdo = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timeformat=unixtime&timezone=Europe%2FLondon`);
    const json3 = await responseHebdo.json();
    console.log(json3);
    const taille2 = json3.daily.time.length;
    const unix2 = json3.daily.time;
    const temperatureHebdoMax = json3.daily.temperature_2m_max;
    const temperatureHebdoMin = json3.daily.temperature_2m_min;
    const precipitationHebdoMax = json3.daily.precipitation_probability_max;
    const wmoCodeHebdo = json3.daily.weather_code;

    for(let i = 0; i < taille2; i++){
        const imageUrlHebdo = await getImageWMOCODE(wmoCodeHebdo[i]);
        output2.innerHTML +=
            '<div class="my-2 p-0">'+
            '<div class="card border-0  shadow-lg rounded-4">'+
            '<div class="card-body p-0 row text-center d-flex align-items-center">'+
            '<div class="col-3 p-0"><h3>'+convertionUnixEnDate(unix2[i])+'</h3></div>'+
            '<div class="col-3 p-0"><i class="bi bi-droplet"></i>'+ precipitationHebdoMax[i]+'%</div>'+
            '<div class="col-3 p-0"><img src="'+ imageUrlHebdo.image +'"  alt="Image du condition de météo"></div>'+
            '<div class="col-3 p-0 fw-bold fs-4">'+Math.round(temperatureHebdoMin[i])+'° / '+Math.round(temperatureHebdoMax[i])+'°</div>'+
            '</div>'+
            '</div>'+
            '</div>';

    }
    output2.classList.remove("blocParDefaut");
    output2.classList.remove("bg-light");
    output2.classList.remove("shadow-lg");

};

function convertionUnixEnHeure(unixtime){
    let unix = unixtime;
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds
    var date = new Date(unix * 1000);

    // Hours part from the timestamp
    var hours = date.getHours();

    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substring(-2);

    return formattedTime;
}

async function getImageWMOCODE(wmoCode){
    let wmocode = wmoCode;
    const response = await fetch('./assets/images/weather_code.json');

    const json = await response.json();

    const imageurl = json[wmocode].day.image;
    const description = json[wmocode].day.description;

    return {image: imageurl, desc: description};
}

function convertionUnixEnDate(unixdate){
    const jourAujourd = new Date().toLocaleString('FR-fr', {  weekday: 'long' });

    let unix = unixdate;
    var date = new Date(unix*1000);

    const getJour =  new Intl.DateTimeFormat("fr-FR", {weekday: "long"}).format(date);

    let jourSemaine = null;

    if(jourAujourd === getJour){
        jourSemaine = "Aujourd'hui";
    }else{
        jourSemaine = new Intl.DateTimeFormat("fr-FR", {weekday: "long"}).format(date);
    }

    return jourSemaine;
}


async function villesMondeEntierMeteo() {
    const villes = ['Paris', 'New York', 'Tokyo', 'Quebec', 'Londres', 'Berlin', 'Amsterdam'];
    let output = '';

    const promesses = villes.map(ville => {
        return fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${ville}&count=1&language=fr&format=json`)
            .then(response => response.json())
            .then(json => {
                const { latitude, longitude, country_code: country, name } = json.results[0];
                return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
                    .then(response2 => response2.json()) // Récupération des données météo{
                    .then(async json2 => {
                        const {temperature: temperature_2m, weathercode} = json2.current_weather;
                        const meteo = await getImageWMOCODE(weathercode);
                        console.log(meteo.image);

                        output += `
                            <div class="col my-2 p-0 mx-1">
                                <div class="card p-2 ps-3 border-0 rounded-4">
                                    <div class="fs-5">${name} (${country})</div>
                                    <div class="row">
                                        <div class="col-4">
                                            <img src="${meteo.image}" alt="Condition météo" />
                                        </div>
                                        <div class="col-8">
                                            <div class="fs-1">${Math.round(temperature_2m)}°C</div>
                                            <div class="fs-6">${meteo.desc}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    })
                    .catch(error => {
                        console.error(`Erreur lors de la récupération des données pour ${ville}:`, error);
                        output += `
                            <div class="col my-2 p-0">
                                <div class="card p-2 ps-3 border-0 shadow-lg rounded-4 bg-danger text-white">
                                    <div class="fs-5">${ville}</div>
                                    <div class="fs-6">Erreur de récupération des données.</div>
                                </div>
                            </div>
                        `;
                    });
            });
    });
    Promise.all(promesses)
        .then(() => {
            // Mise à jour du contenu HTML une fois toutes les requêtes terminées
            document.getElementById('villePrincipale').innerHTML = output;
        })
        .catch(error => {
            console.error('Une erreur globale s’est produite :', error);
        });
}