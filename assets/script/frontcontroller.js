import { villesMondeEntierMeteo } from "./villesMondeEntier.js";
import { meteoActuelle } from "./meteoActuelle.js";
import { meteoJournee } from "./meteoJournee.js";
import { meteoSemaine } from "./meteoSemaine.js";

export async function frontcontroller(){
    await villesMondeEntierMeteo();
    await meteoActuelle();
    await meteoJournee();
    await meteoSemaine();
}