export async function ConstructElement7VillesCapital(villes) {
    const a = document.createElement("a");
    let meteoSituation = await getWeatherIcon(dataWeather.wmoCode);
    a.innerHTML =
        `<a href="#" className="col my-2 p-0 mx-1 text-decoration-none">
            <div className="card d-flex flex-column h-100 p-2 ps-3 border-0 rounded-4">
                <div className="fs-5">${villes.name} <span className="fw-bold">(${villes.country})</span></div>
                <div className="row">
                    <div className="col-4">
                        <img src="${meteoSituation.image}" alt="Condition météo"/>
                    </div>
                    <div className="col-8">
                        <div className="fs-1 fw-bold">${dataWeather.temperature}°C</div>
                        <div className="fs-6">${meteoSituation.desc}</div>
                    </div>
                </div>
            </div>
        </a>`;
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
}

