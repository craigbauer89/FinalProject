import { Squadre } from "./squadre";

export interface Stadium {

    id:any;
    indirizzo: string;
    allenatore: string;
    sito: string;
    name: string;
    telefono: string;
    latitude: number;
    longitude: number;
    squadre: Squadre ;
    
    }
