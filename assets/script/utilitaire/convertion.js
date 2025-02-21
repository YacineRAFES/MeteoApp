//Récupère le UNIX et retourne l'heure
export function convertionUnixEnHeure(unixtime){
    let date = new Date(unixtime * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    return hours + ':' + minutes.slice(-2);
}

//Récupère le UNIX et retourne le jour
export function convertionUnixEnDate(unixdate){
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



