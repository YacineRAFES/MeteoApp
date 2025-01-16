document.getElementById('search').addEventListener("click", () => meteo());

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
                    '<img src="'+ imageurl +'" class="card-img-top" alt="card-image">'+
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
                    '<div class="col-3 p-0"><img src="'+ imageUrlHebdo +'"  alt="Image du condition de météo"></div>'+
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
    const response = await fetch('https://gist.githubusercontent.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c/raw/76b0cb0ef0bfd8a2ec988aa54e30ecd1b483495d/descriptions.json');
    const json = await response.json();
    const imageurl = json[wmocode].day.image;

    return imageurl;
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
