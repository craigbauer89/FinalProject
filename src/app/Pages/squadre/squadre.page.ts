import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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

  @ViewChild(MatSort)
  sort!: MatSort;
  element: any;
  hideForResponsive = false;
  hideForResponsivePhone = false;

  // squadre: Squadre[];
  squadre: Squadre[] = [];
  gironeSquadre: Squadre[] = [];
//   squadra:any = {
//     nome: '',

    // squadra = JSON.stringify(this.squadre);
// };
displayedColumns: string[] = [ 'img', 'nome', 'giocate', 'vittorie', 'pareggi', 'sconfitte',  'meteFatti'!, 'puntiFatti', 'puntiSubiti','differenza' ,'punti' ];
  dataSource = new MatTableDataSource(this.gironeSquadre) ;


  
  

  constructor(private squadraServiceService: SquadraServiceService,private responsive: BreakpointObserver) { }
 
  
  ngOnInit()  {

    this.squadraServiceService.findAll().subscribe(data => {
      this.squadre = data;

      this.squadre.forEach(element => {
        if(element.girone == 1) {
  
          this.gironeSquadre.push(element)
  
        }
      });
      // console.log(JSON.stringify(data));
      // console.log(this.squadre[1]);
      // for(let cat in this.squadre) {
        // console.log(this.squadre);
        this.dataSource = new MatTableDataSource(this.gironeSquadre) ;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
      // }
    });

    this.responsive.observe([
      Breakpoints.TabletPortrait,
      Breakpoints.TabletLandscape,
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait])
      .subscribe(result => {
  
        this.hideForResponsive = false;
        this.hideForResponsivePhone = false;
    
        const breakpoints = result.breakpoints;
    
        // if (result.matches) {
         
        // }

        if (breakpoints[Breakpoints.HandsetPortrait]) {
          this.hideForResponsivePhone = true;
          this.hideForResponsive = true;
          this.displayedColumns = [ 'img', 'nome', 'punti', 'giocate', 'differenza' ];
        }
        
        // else if (breakpoints[Breakpoints.HandsetLandscape]) {
        //   this.hideForResponsivePhone = true;
        //   this.hideForResponsive = false;
        //   this.displayedColumns = [ 'img', 'nome', 'vittorie', 'pareggi', 'sconfitte', 'punti', 'giocate', 'differenza' ];
        // }
        // else if (breakpoints[Breakpoints.TabletLandscape]) {
        //   this.hideForResponsive = false;
        //   this.hideForResponsivePhone = false;
        //   this.displayedColumns = [ 'img', 'nome', 'vittorie', 'pareggi', 'sconfitte', 'punti', 'giocate', 'meteFatti'!, 'puntiSubiti','puntiFatti','differenza' ];
          
        // }
    
      });
  }

  // ngAfterViewInit() {

    getPath(name: String): String {
      return "../../../assets/" + name + ".jpg";
      
      }

  // }
 

  girone(girone:number) {
    
    this.squadraServiceService.findAll().subscribe(data => {
      this.squadre = data;

      this.gironeSquadre.splice(0,this.gironeSquadre.length);

      this.squadre.forEach(element => {
        if(element.girone == girone) {
  
          this.gironeSquadre.push(element)
  
        }
      });
      // console.log(JSON.stringify(data));
      // console.log(this.squadre[1]);
      // for(let cat in this.squadre) {
        // console.log(this.squadre);
        this.dataSource = new MatTableDataSource(this.gironeSquadre) ;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
      // }
    });

   

  }


  






  scrollleft() {

    const slidesContainer = document.getElementById("slides-container");
const slide = document.querySelector(".slide");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");

if (slide != null && slidesContainer != null) {
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft -= slideWidth;
}

}

  

  scrollright() {

    const slidesContainer = document.getElementById("slides-container");
const slide = document.querySelector(".slide");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");

if (slide != null && slidesContainer != null) {
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft += slideWidth;

    
  }

}

}



