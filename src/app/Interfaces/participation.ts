import { Classifica } from "./classifica";
import { Jersey } from "./jersey";
import { Partite } from "./partite";
import { Squadre } from "./squadre";
import { Stadium } from "./stadium";

export interface Pariticpation {

id:number;
punti: number;
vittorie: number;
pareggi: number;
sconfitte: number;
giocate: number;
meteFatti: number;
meteSubiti: number;
puntiSubiti: number;
puntiFatti: number;
puntiBonus: number;
differenza: number;
girone: number;
classifica: Classifica;
squadra: Squadre;


}
