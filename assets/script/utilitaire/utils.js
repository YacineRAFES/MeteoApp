//Récupère le UNIX et retourne l'heure
export function convertionUnixEnHeure(unixtime){
    let unix = unixtime;

    var date = new Date(unix * 1000);

    var hours = date.getHours();

    var minutes = "0" + date.getMinutes();

    var formattedTime = hours + ':' + minutes.substring(-2);

    return formattedTime;
}

//Récupère le UNIX et retourne le jour
export function convertionUnixEnDate(unixdate){
    const jourAujourd = new Date().toLocaleString('FR-fr', { weekday: 'long' });

    let unix = unixdate;
    var date = new Date(unix*1000);

    if (isNaN(date.getTime())) {
        console.error("Date non valide :", date);
        return "Date non valide";
    }

    const getJour =  new Intl.DateTimeFormat("fr-FR", { weekday: "long" }).format(date);

    let jourSemaine = null;

    if(jourAujourd === getJour){
        jourSemaine = "Aujourd'hui";
    }else{
        jourSemaine = new Intl.DateTimeFormat("fr-FR", { weekday: "long" }).format(date);
    }

    return jourSemaine;
}



