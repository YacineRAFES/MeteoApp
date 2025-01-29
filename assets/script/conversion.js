export function convertionUnixEnHeure(unixtime){
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