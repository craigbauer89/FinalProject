import { Picture } from "./picture";
import { Squadre } from "./squadre";

export interface Player {

    id:number;
    name: string;
    tries: number;
    punti: number;
    gialli: number;
    rossi:number;
    squadre: Squadre ;
       picture: Picture;
    }
