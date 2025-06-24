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

export async function ConstructElementMeteoActuelle(ville, meteo) {
    const div = document.createElement("div");
    div.className = "col-12 bg-white rounded-start-4";
    div.innerHTML = `
        <div class="row p-3">
            <div class="col-6 ">
                <div class="col fs-1 fw-bold">
                    ${ville.name}
                </div>
                <div class="fs-6">ven 11 fév. 2025, 11:11</div>
                <img style="height: 150px;" src="${meteo.icon}" alt="Icône météo"><span class="fs-1 fw-bold">${meteo.temperature}°C</span>
            </div>
            <div class="col-6 mt-2 pe-5">
                <div class="text-end">
                    <div>${meteo.desc}</div>
                    <div>Humidité: ${meteo.humidite} %</div>
                </div>
            </div>
        </div>
    `;
}

