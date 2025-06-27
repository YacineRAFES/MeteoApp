import {getWeatherIcon} from "./utilitaire/weatherData.js";

export async function ConstructElement7VillesCapital(infoville, meteo) {
    const a = document.createElement("a");
    a.href = "#";
    a.className = "col my-2 p-0 mx-1 text-decoration-none";

    a.innerHTML = `
        <div class="card d-flex flex-column h-100 p-2 ps-3 border-0 rounded-4">
            <div class="fs-5">${infoville.name} <span class="fw-bold">(${infoville.country})</span></div>
            <div class="row">
                <div class="col-4">
                    <img src="${meteo.icon}" alt="Condition météo"/>
                </div>
                <div class="col-8">
                    <div class="fs-1 fw-bold">${meteo.temperature}°C</div>
                    <div class="fs-6">${meteo.desc}</div>
                </div>
            </div>
        </div>
    `;
    return a;
}

export function ConstructElement7VillesCapitalError(villeName) {
    const div = document.createElement("div");
    div.innerHTML =
        `<div class="col my-2 p-0">
            <div class="card p-2 ps-3 border-0 shadow-lg rounded-4 bg-danger text-white">
                <div class="fs-5">${villeName}</div>
                <div class="fs-6">Erreur de récupération des données.</div>
            </div>
        </div>`;
    return div;
}

export async function ConstructElementMeteoActuelle(ville, meteoActuelle) {
    const meteoActuelleDiv = document.getElementById('meteoActuelle');
    //Vide le contenu
    meteoActuelleDiv.innerHTML = '';
    const div = document.createElement("div");
    div.className = "col-12 bg-white rounded-start-4";
    div.innerHTML = `
        <div class="row p-3">
            <div class="col-6 ">
                <div class="col fs-1 fw-bold">
                    ${ville.name}
                </div>
                <div class="fs-6">ven 11 fév. 2025, 11:11</div>
                <img style="height: 150px;" src="${meteoActuelle.icon}" alt="${ meteoActuelle.desc }"><span class="fs-1 fw-bold">${meteoActuelle.temperature}°C</span>
            </div>
            <div class="col-6 mt-2 pe-5">
                <div class="text-end">
                    <div>${meteoActuelle.desc}</div>
                    <div>Humidité: ${meteoActuelle.humidite} %</div>
                </div>
            </div>
        </div>
    `;
    // Ajoute le div crée dans meteoActuelle
    meteoActuelleDiv.appendChild(div);
}

export async function ConstructElementMeteoJournee(meteoJournee) {
    const meteoJourneeDiv = document.getElementById('meteoJournee');
    //Vide le contenu
    meteoJourneeDiv.innerHTML = '';
    for (let i = 0; i < meteoJournee.wmoCode.length; i++) {
        const meteoJourneeSituation = await getWeatherIcon(meteoJournee.wmoCode[i]);
        const div = document.createElement("div");
        div.className = "col-2";
        div.innerHTML += `
            <div class="card text-center border-0">
                <div class="card-body">
                    <h3 class="card-title text-center">${meteoJournee.heure[i]}</h3>
                    <img src="${meteoJourneeSituation.imageurl}" class="card-img-top" alt="${ meteoJourneeSituation.desc }">
                    <p class="card-text text-center fw-bold fs-4">${meteoJournee.temperature[i]}°C</p>
                    <p class="card-text text-center"><i class="bi bi-droplet"></i> ${meteoJournee.precipitation[i]}%</p>
                </div>
            </div>
        `;
    }
    meteoJourneeDiv.classList.remove("blocParDefaut");
    meteoJourneeDiv.classList.remove("bg-light");
    meteoJourneeDiv.classList.add("bg-white");
    // Ajoute le div crée dans meteoActuelle
    meteoJourneeDiv.appendChild(div);
}

export async function ConstructElementMeteoSemaine(meteoSemaine) {
    const meteoSemaineDiv = document.getElementById('meteoSemaine');
    meteoSemaineDiv.innerHTML = '';
    const div = document.createElement("div");
    for(let i = 0; i < meteoSemaine.wmoCode.length; i++){
        const meteoSemaineSituation = await getWeatherIcon(meteoSemaine.wmoCode[i]);
        div.className = "my-2 p-0";
        div.innerHTML +=`
            <div class="card border-0 shadow-lg rounded-4">
                <div class="card-body p-0 row text-center d-flex align-items-center">
                    <div class="col-3 p-0"><h3> ${ meteoSemaine.date[i] } </h3></div>
                    <div class="col-3 p-0"><i class="bi bi-droplet"></i> ${ meteoSemaine.precipitation_max[i] } %</div>
                    <div class="col-3 p-0"><img src=" ${ meteoSemaineSituation.imageurl } " alt="${ meteoSemaineSituation.desc }"></div>
                    <div class="col-3 p-0 fw-bold fs-4"> ${ meteoSemaine.temperature_min[i] }° / ${ meteoSemaine.temperature_max[i] }°</div>
                </div>
            </div>`;
    }
    meteoSemaineDiv.classList.remove("blocParDefaut");
    meteoSemaineDiv.classList.remove("bg-light");
    meteoSemaineDiv.classList.remove("shadow-lg");
    meteoSemaineDiv.appendChild(div);
}

