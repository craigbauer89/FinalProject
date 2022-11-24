import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Jersey } from 'src/app/Interfaces/jersey';
import { Squadre } from 'src/app/Interfaces/squadre';
import { JerseyService } from 'src/app/Services/jersey.service';
import { SquadraServiceService } from 'src/app/Services/squadra-service.service';

@Component({
  templateUrl: './statistiche.page.html',
  styleUrls: ['./statistiche.page.scss']
})
export class StatistichePage implements OnInit {


  @ViewChild(MatSort)
  sort!: MatSort;
  squadre: Squadre[] = [];
  squadre1: Squadre[] = [];
  squadre2: Squadre[] = [];
  jersey: Jersey[] = [];
  element: any;
  showGialli: boolean= false;
  showPunti: boolean = false;
  showMete: boolean = false;
  // gironeSquadre: Squadre[] = [];

  displayedColumns: string[] = [ 'numero', 'img', 'nome', 'meteSubiti' ];
  // displayedColumns: string[] = [ 'img', 'nome', 'giocate', 'vittorie', 'pareggi', 'sconfitte',  'meteFatti'!, 'puntiFatti', 'puntiSubiti','differenza' ,'punti' ];
  dataSource = new MatTableDataSource(this.squadre) ;

  displayedColumns1: string[] = [ 'numero', 'img', 'nome', 'puntiFatti' ];
  // displayedColumns: string[] = [ 'img', 'nome', 'giocate', 'vittorie', 'pareggi', 'sconfitte',  'meteFatti'!, 'puntiFatti', 'puntiSubiti','differenza' ,'punti' ];
  dataSource1 = new MatTableDataSource(this.squadre) ;

  displayedColumns2: string[] = [ 'numero', 'img', 'nome', 'meteFatti' ];
  // displayedColumns: string[] = [ 'img', 'nome', 'giocate', 'vittorie', 'pareggi', 'sconfitte',  'meteFatti'!, 'puntiFatti', 'puntiSubiti','differenza' ,'punti' ];
  dataSource2 = new MatTableDataSource(this.squadre) ;

  constructor(private squadraServiceService: SquadraServiceService) { }

  ngOnInit(): void {

   
    this.showPunti = true;
   


      this.squadraServiceService.findAll().subscribe(data => {
        this.squadre = data;
        console.log(this.squadre)
        
        this.dataSource1 = new MatTableDataSource(this.squadre) ;
        this.dataSource1.sort = this.sort;
        

  
    });
  
   
  
  }


  getPath(name: String): String {
    return "../../../assets/" + name + ".jpg";
    
    
    }


    
//   scrollleft() {

//     const slidesContainer = document.getElementById("slides-container");
// const slide = document.querySelector(".slide");
// const prevButton = document.getElementById("slide-arrow-prev");
// const nextButton = document.getElementById("slide-arrow-next");

// if (slide != null && slidesContainer != null) {
//   const slideWidth = slide.clientWidth;
//   slidesContainer.scrollLeft -= slideWidth;
// }

// }

  

//   scrollright() {

//     const slidesContainer = document.getElementById("slides-container");
// const slide = document.querySelector(".slide");
// const prevButton = document.getElementById("slide-arrow-prev");
// const nextButton = document.getElementById("slide-arrow-next");

// if (slide != null && slidesContainer != null) {
//   const slideWidth = slide.clientWidth;
//   slidesContainer.scrollLeft += slideWidth;

    
//   }

// }

gialli() {

  this.showGialli= true;
  this.showPunti = false;
  this.showMete = false;

  this.squadraServiceService.findAll().subscribe(data => {
    this.squadre = data;
    console.log(this.squadre)
    
    this.dataSource = new MatTableDataSource(this.squadre) ;
    this.dataSource.sort = this.sort;
    


});

}

punti() {

  this.showGialli= false;
  this.showPunti = true;
  this.showMete = false;

  this.squadraServiceService.findAll().subscribe(data => {
    this.squadre1 = data;
    console.log(this.squadre)
    
    this.dataSource1 = new MatTableDataSource(this.squadre1) ;
    this.dataSource1.sort = this.sort;
    


});
  
}

mete() {

  this.showGialli= false;
  this.showPunti = false;
  this.showMete = true;

  this.squadraServiceService.findAll().subscribe(data => {
    this.squadre2 = data;
    console.log(this.squadre)
    
    this.dataSource2 = new MatTableDataSource(this.squadre2) ;
    this.dataSource2.sort = this.sort;
    


});
  
}

}


