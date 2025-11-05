import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Jersey } from 'src/app/Interfaces/jersey';
import { Player } from 'src/app/Interfaces/player';
import { Squadre } from 'src/app/Interfaces/squadre';
import { JerseyService } from 'src/app/Services/jersey.service';
import { PlayerService } from 'src/app/Services/player.service';
import { SquadraServiceService } from 'src/app/Services/squadra-service.service';

@Component({
  templateUrl: './statistiche.page.html',
  styleUrls: ['./statistiche.page.scss']
})
export class StatistichePage implements OnInit {


  @ViewChild(MatSort)
  sort!: MatSort;
  squadre: Squadre[] = [];
  players: Player []=[];
  squadre1: Squadre[] = [];
  squadre2: Squadre[] = [];
  jersey: Jersey[] = [];
  element: any;
  showGialli: boolean= false;
  showPunti: boolean = false;
  showMete: boolean = false;
  showPlayer: boolean = false;
  showSquadra: boolean = true;
  // gironeSquadre: Squadre[] = [];

  displayedColumns: string[] = [ 'numero', 'img', 'nome', 'gialli' ];
  // displayedColumns: string[] = [ 'img', 'nome', 'giocate', 'vittorie', 'pareggi', 'sconfitte',  'meteFatti'!, 'puntiFatti', 'puntiSubiti','differenza' ,'punti' ];
  dataSource = new MatTableDataSource(this.squadre) ;

  displayedColumns1: string[] = [ 'numero', 'img', 'nome', 'puntiFatti' ];
  // displayedColumns: string[] = [ 'img', 'nome', 'giocate', 'vittorie', 'pareggi', 'sconfitte',  'meteFatti'!, 'puntiFatti', 'puntiSubiti','differenza' ,'punti' ];
  dataSource1 = new MatTableDataSource(this.squadre) ;

  displayedColumns2: string[] = [ 'numero', 'img', 'nome', 'meteFatti' ];
  // displayedColumns: string[] = [ 'img', 'nome', 'giocate', 'vittorie', 'pareggi', 'sconfitte',  'meteFatti'!, 'puntiFatti', 'puntiSubiti','differenza' ,'punti' ];
  dataSource2 = new MatTableDataSource(this.squadre) ;
  

  displayedColumnsPl: string[] = [ 'numero', 'img', 'nome', 'gialli' ];
  // displayedColumns: string[] = [ 'img', 'nome', 'giocate', 'vittorie', 'pareggi', 'sconfitte',  'meteFatti'!, 'puntiFatti', 'puntiSubiti','differenza' ,'punti' ];
  dataSourcePl = new MatTableDataSource(this.players) ;

  displayedColumns1Pl: string[] = [ 'numero', 'img', 'nome', 'puntiFatti' ];
  // displayedColumns: string[] = [ 'img', 'nome', 'giocate', 'vittorie', 'pareggi', 'sconfitte',  'meteFatti'!, 'puntiFatti', 'puntiSubiti','differenza' ,'punti' ];
  dataSource1Pl = new MatTableDataSource(this.players) ;

  displayedColumns2Pl: string[] = [ 'numero', 'img', 'nome', 'meteFatti' ];
  // displayedColumns: string[] = [ 'img', 'nome', 'giocate', 'vittorie', 'pareggi', 'sconfitte',  'meteFatti'!, 'puntiFatti', 'puntiSubiti','differenza' ,'punti' ];
  dataSource2Pl = new MatTableDataSource(this.players) ;

  constructor(private playerService: PlayerService, private squadraServiceService: SquadraServiceService) { }

  ngOnInit(): void {

   
    this.showPunti = true;


    this.squadraServiceService.findAll().subscribe(data => {
      this.squadre = data;
      console.log(this.squadre)
      
      this.dataSource = new MatTableDataSource(this.squadre) ;
      this.dataSource.sort = this.sort;
      
    });
   

  this.playerService.findAll().subscribe(data => {
    this.players = data;
    console.log(this.players)
    
    this.dataSource1Pl = new MatTableDataSource(this.players) ;
    this.dataSource1Pl.sort = this.sort;

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

giocatori() {
  this.showPlayer= true;
  this.showSquadra= false;
  
}

squadres() {
  this.showSquadra= true;
  this.showPlayer= false;
}


gialli() {

  this.showGialli= true;
  this.showPunti = false;
  this.showMete = false;

  if(this.showSquadra){
    this.squadraServiceService.findAll().subscribe(data => {
      this.squadre = data;
      console.log(this.squadre)
      
      this.dataSource = new MatTableDataSource(this.squadre) ;
      this.dataSource.sort = this.sort;
      
  
  
  });
  }
  else {
    this.playerService.findAll().subscribe(data => {
      this.players = data;
      console.log(this.players)
      
      this.dataSourcePl = new MatTableDataSource(this.players) ;
      this.dataSourcePl.sort = this.sort;
  
  });
  }



}

punti() {

  this.showGialli= false;
  this.showPunti = true;
  this.showMete = false;

  if(this.showSquadra){
    this.squadraServiceService.findAll().subscribe(data => {
      this.squadre = data;
      console.log(this.squadre)
      
      this.dataSource1 = new MatTableDataSource(this.squadre) ;
      this.dataSource1.sort = this.sort;
      
  
  
  });
  }
  else {
    this.playerService.findAll().subscribe(data => {
      this.players = data;
      console.log(this.players)
      
      this.dataSource1Pl = new MatTableDataSource(this.players) ;
      this.dataSource1Pl.sort = this.sort;
  
  });
  }
  
}

mete() {

  this.showGialli= false;
  this.showPunti = false;
  this.showMete = true;

  if(this.showSquadra){
    this.squadraServiceService.findAll().subscribe(data => {
      this.squadre = data;
      console.log(this.squadre)
      
      this.dataSource2 = new MatTableDataSource(this.squadre) ;
      this.dataSource2.sort = this.sort;
      
  
  
  });
  }
  else {
    this.playerService.findAll().subscribe(data => {
      this.players = data;
      console.log(this.players)
      
      this.dataSource2Pl = new MatTableDataSource(this.players) ;
      this.dataSource2Pl.sort = this.sort;
  
  });
  }
  
}

}


