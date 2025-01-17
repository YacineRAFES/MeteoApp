<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- CDN Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <!-- CDN Bootstrap Icons -->
    <link rel="stylesheet" href="./assets/style/bootstrap.min.css">
    <title>OpenWeatherApp</title>
    <link rel="stylesheet" href="./assets/style/style.css">
    <script src="https://static.meteoblue.com/cdn/mapbox-gl-js/v1.11.1/mapbox-gl.js"></script>
    <link rel="stylesheet" href="https://static.meteoblue.com/cdn/mapbox-gl-js/v1.11.1/mapbox-gl.css" target="_blank" rel="noreferrer">

    <script src="https://static.meteoblue.com/lib/maps-plugin/v0.x/maps-plugin.js"></script>

</head>
<body class="bg-body-secondary">
    <div class="contrainer-fluid">
        <div class="card text-bg-dark rounded-0 border-0">
            <video class="img-fluid w-100 wallpaper" autoplay muted loop>
                <source src="./assets/videos/bannervideostorm.mp4" type="video/mp4">
                votre navigateur ne supporte pas la lecture de vidéos.
            </video>
            <div class="card-img-overlay d-flex justify-content-center align-items-center">
                <h1 class="card-title fw-bold text-center my-auto">MeteoApp</h1>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row px-2" id="villePrincipale"></div>
        
    </div>
    <div class="container mt-4">
        <div class="text-center w-25 mx-auto">
            <input class="form-control text-center" id="ville" type="text" placeholder="Entrer le nom d'une ville" aria-label="Entrer le nom d'une ville">
            <button class="btn btn-light mt-2" id="search">Rechercher</button>
        </div>
        <div id="weather">
            <!-- Prévision actuelle -->
            <div id="actuel" class="row mt-2 rounded-4 bg-light shadow-lg">
                <div id="map_container" style="height: 500px; width: 100%;"></div>

                <!-- Carte de radar -->
                <!-- <div class="fs-3">Dombasle-sur-Meurthe</div>
                <div>ven. 20 décembre 2024 09:56</div>
                <div class="row">
                    <div class="col fs-1">
                        <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="Image d'une prévision de temps">5°C
                        <iframe src="https://www.rainviewer.com/map.html?loc=47.7719,16.6359,4.395205322804343&c=3&o=83&layer=sat-rad&mlayer=1&sm=1&ts=1" width="100%" frameborder="0" style="border:0;height:50vh;" allowfullscreen></iframe>
                    </div>
                </div> -->
                <!-- <div class="col m-auto">
                    <div>
                        <p class="fs-5 text-center">Veuillez entrer le nom de la ville</p>
                    </div>
                </div> -->
            </div>
            <!-- Prévision d'aujourd'hui -->
            <div class="row mt-2 rounded-4 bg-light shadow-lg blocParDefaut" id="output">
                <div class="col m-auto">
                    
                </div>
            </div>

            <!-- Prévision sur les 7 jours -->
            <div class="row mt-2 rounded-4 bg-light shadow-lg blocParDefaut" id="output2">
                
            </div>

        </div>
    </div>
    <script src="node_modules/chart.js/dist/chart.umd.js"></script>
    
    <script type="module" src="./assets/script/script.js"></script>
</body>
</html>