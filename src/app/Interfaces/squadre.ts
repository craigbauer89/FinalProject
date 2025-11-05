import { Classifica } from "./classifica";
import { Jersey } from "./jersey";
import { Partite } from "./partite";
import { Stadium } from "./stadium";

export interface Squadre {

id:number;
nome: string;
allenatore: string;
sito: string;
indirizzo: string;
latitude: string;
longitude: string;
punti: number;
vittorie: number;
pareggi: number;
sconfitte: number;
giocate: number;
meteFatti: number;
meteSubiti: number;
puntiSubiti: number;
puntiFatti: number;
differenza: number;
jersey: Jersey;
girone: number;
classifica: Classifica;
homegames: Partite [];
awaygames: Partite [];
stadium: Stadium;


}
