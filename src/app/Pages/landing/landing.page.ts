import { Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Partite } from 'src/app/Interfaces/partite';
import { Squadre } from 'src/app/Interfaces/squadre';
import { PartiteService } from 'src/app/Services/partite.service';
import { SquadraServiceService } from 'src/app/Services/squadra-service.service';

@Component({
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss']
})
export class LandingPage implements OnInit {

  @ViewChild(MatSort)
  sort!: MatSort;
  element: any;
  hideForResponsive = false;
  hideForResponsivePhone = false;
  currentId = 0;
  partite: Partite[] = [];

  squadre: Squadre[] = [];

displayedColumns: string[] = [ 'img', 'nome', 'punti', 'differenza' ];
  dataSource = new MatTableDataSource(this.squadre) ;


  // displayedColumns2: string[] = ['date', 'img1', 'squadra1.nome', 'puntisquadra1', 'puntisquadra2', 'squadra2.nome', 'img2' ];
  displayedColumns2: string[] = ['img1', 'puntisquadra1', 'dash',  'puntisquadra2', 'img2' ];
  dataSource2: Partite[] = [];
  

  constructor(private squadraServiceService: SquadraServiceService,private partiteService: PartiteService) { }
 
  
  ngOnInit()  {

    this.squadraServiceService.findAll().subscribe(data => {
      this.squadre = data;

        this.dataSource = new MatTableDataSource(this.squadre) ;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
  
    });

    this.partiteService.findAll().subscribe(data => {
      this.partite = data;
 
        this.dataSource2 = this.partite ;
     
    });

  }

  // ngAfterViewInit() {

    getPath(name: String): String {
      return "../../../assets/" + name + ".jpg";
      
      }

  // }
 

}






