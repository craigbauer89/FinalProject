import { Championship } from "./championship";
import { Squadre } from "./squadre";

export interface Classifica {
     
    id:number;
    name: string;
    championship: Championship ;
    squadre: Squadre[] ;
}
