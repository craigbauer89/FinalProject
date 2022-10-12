import { Component, OnInit } from '@angular/core';
import { Partite } from 'src/app/Interfaces/partite';
import { Squadre } from 'src/app/Interfaces/squadre';
import { PartiteService } from 'src/app/Services/partite.service';
import { SquadraServiceService } from 'src/app/Services/squadra-service.service';


@Component({
  templateUrl: './partite.page.html',
  styleUrls: ['./partite.page.scss']
})
export class PartitePage implements OnInit {

  
  // squadre: Squadre[];
  partite: Partite[] = [];
  modifybox = false;
//   squadra:any = {
//     nome: '',

    // squadra = JSON.stringify(this.squadre);
// };
displayedColumns: string[] = ['squadra1.nome', 'puntisquadra1', 'puntisquadra2', 'squadra2.nome', 'modifica', 'cancellare' ];
  dataSource: Partite[] = [];
  squadre: Squadre[] = [];
  

  constructor(private partiteService: PartiteService, private SquadreServiceservice: SquadraServiceService) { }

  ngOnInit()  {

   
    this.partiteService.findAll().subscribe(data => {
      this.partite = data;
      // console.log(JSON.stringify(data));
      // console.log(this.squadre[1]);
      // for(let cat in this.squadre) {
        // console.log(this.squadre);
        this.dataSource = this.partite ;
        // console.log(this.dataSource);
        // console.log(this.dataSource[0]);
        // console.log(this.dataSource[0].squadra1.nome);
        // for(let i in this.dataSource)
        // console.log(this.dataSource[i].squadra1.nome);
        
      // }
    });
  }

  // modifyPartita(partita:Partite) {
  
  //   this.partiteService.modifyPartita(partita.id, partita)
  //   .subscribe(data => console.log(data));

  // }

  modifyPartita() {
   this.modifybox = true;
  }

  // cancellaPartita() {
  //   window.alert("Cancellato")
  // }


  cancellaPartita(id:number) {

  let squadra1:Squadre;
  let squadra2:Squadre;
  let deletedPartita:Partite;
  this.partite.forEach(element => {
    if(element.id == id) {
       deletedPartita= element;
       squadra1 = element.squadra1;
       squadra2 = element.squadra2;

       squadra1.puntiFatti -= deletedPartita.puntisquadra1;
       squadra1.puntiSubiti -= deletedPartita.puntisquadra2;
  squadra1.meteFatti-= deletedPartita.meteSquadra1;
  squadra1.meteSubiti -= deletedPartita.meteSquadra2;
  let differenza = deletedPartita.puntisquadra1-deletedPartita.puntisquadra2;
  squadra1.differenza -= differenza;
  squadra1.giocate -= 1;
  if (differenza > 0) {
    squadra1.vittorie -= 1; 
    squadra1.punti -= 4; 
  }
  else if(differenza < 0)  {
    squadra1.sconfitte -= 1; 
    
  }
  else {
    squadra1.pareggi -= 1; 
    squadra1.punti -= 2; 
  }

  this.SquadreServiceservice.modifySquadra(squadra1.id, squadra1)
  .subscribe(data => console.log(data));


  squadra2.puntiFatti -= deletedPartita.puntisquadra2;
  squadra2.puntiSubiti -= deletedPartita.puntisquadra1;
squadra2.meteFatti-= deletedPartita.meteSquadra2;
squadra2.meteSubiti -= deletedPartita.meteSquadra1;
let differenza2 = deletedPartita.puntisquadra2-deletedPartita.puntisquadra1;
squadra2.differenza -= differenza2;
squadra2.giocate -= 1;
if (differenza2 > 0) {
squadra2.vittorie -= 1; 
squadra2.punti -= 4; 
}
else if(differenza2 < 0)  {
squadra2.sconfitte -= 1; 

}
else {
squadra2.pareggi -= 1; 
squadra2.punti -= 2; 
}

this.SquadreServiceservice.modifySquadra(squadra2.id, squadra2)
.subscribe(data => console.log(data));

    }}
    );
  

 




  this.partiteService.cancellaPartita(id)
  .subscribe(
    data => {
      console.log('deleted response', data);
  // .subscribe(
    // resp => {
    //   console.log(resp)
      // this.ngOnInit()
// }
// )

  window.alert("Cancellato")
  this.ngOnInit()
})

}
}
