import { Component, OnInit } from '@angular/core';
import { Squadre } from 'src/app/Interfaces/squadre';
import { SquadraServiceService } from 'src/app/Services/squadra-service.service';



// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
//   punti: String;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
  // {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', punti: '0'},
  // {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', punti: '0'},
  // {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', punti: '0'},
  // {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', punti: '0'},
  // {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', punti: '0'},
  // {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', punti: '0'},
  // {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', punti: '0'},
  // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', punti: '0'},
  // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', punti: '0'},
  // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', punti: '0'},
// ];

@Component({
  templateUrl: './squadre.page.html',
  styleUrls: ['./squadre.page.scss']
})



export class SquadrePage implements OnInit {

  

  // squadre: Squadre[];
  squadre: Squadre[] = [];
//   squadra:any = {
//     nome: '',

    // squadra = JSON.stringify(this.squadre);
// };
displayedColumns: string[] = ['id', 'nome', 'vittorie', 'pareggi', 'sconfitte', 'punti', 'giocate', 'meteFatti', 'meteSubiti','puntiSubiti','puntiFatti','differenza' ];
  dataSource = this.squadre ;

  constructor(private squadraServiceService: SquadraServiceService) { }

  ngOnInit()  {

    this.squadraServiceService.findAll().subscribe(data => {
      this.squadre = data;
      // console.log(JSON.stringify(data));
      // console.log(this.squadre[1]);
      // for(let cat in this.squadre) {
        // console.log(this.squadre);
        this.dataSource = this.squadre ;
        console.log(this.dataSource);
      // }
    });
  }

  
  

}

