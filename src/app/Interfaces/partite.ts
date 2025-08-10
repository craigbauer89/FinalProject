import { Classifica } from "./classifica";
import { Squadre } from "./squadre";

export interface Partite {


id?:any;
date: Date;
squadra1_id: number;
squadra2_id: number;
puntisquadra1: number;
puntisquadra2: number;
meteSquadra1: number;
meteSquadra2: number;
girone_id:number;


}
