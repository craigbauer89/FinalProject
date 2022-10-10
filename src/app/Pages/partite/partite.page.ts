import { Component, OnInit } from '@angular/core';
import { Partite } from 'src/app/Interfaces/partite';
import { Squadre } from 'src/app/Interfaces/squadre';
import { PartiteService } from 'src/app/Services/partite.service';

@Component({
  templateUrl: './partite.page.html',
  styleUrls: ['./partite.page.scss']
})
export class PartitePage implements OnInit {

  
  // squadre: Squadre[];
  partite: Partite[] = [];
//   squadra:any = {
//     nome: '',

    // squadra = JSON.stringify(this.squadre);
// };
displayedColumns: string[] = ['squadra1.nome', 'puntisquadra1', 'puntisquadra2', 'squadra2.nome' ];
  dataSource: Partite[] = [];

  constructor(private partiteService: PartiteService) { }

  ngOnInit()  {

    this.partiteService.findAll().subscribe(data => {
      this.partite = data;
      // console.log(JSON.stringify(data));
      // console.log(this.squadre[1]);
      // for(let cat in this.squadre) {
        // console.log(this.squadre);
        this.dataSource = this.partite ;
        console.log(this.dataSource);
        console.log(this.dataSource[0]);
        console.log(this.dataSource[0].squadra1.nome);
        for(let i in this.dataSource)
        console.log(this.dataSource[i].squadra1.nome);
        
      // }
    });
  }

  
  

}

