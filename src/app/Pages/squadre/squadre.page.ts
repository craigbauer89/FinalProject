import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Championship } from 'src/app/Interfaces/championship';
import { Season } from 'src/app/Interfaces/season';
import { Squadre } from 'src/app/Interfaces/squadre';
import { ChampionshipService } from 'src/app/Services/championship.service';
import { SeasonService } from 'src/app/Services/season.service';
import { SquadraServiceService } from 'src/app/Services/squadra-service.service';


@Component({
  templateUrl: './squadre.page.html',
  styleUrls: ['./squadre.page.scss']
})

export class SquadrePage implements OnInit {

  season: Season | undefined;
  seasons: Season[] = [];
  league: Championship | undefined;
  activeSeasonId:any;
  dataSourceSeason = this.seasons;
  championships: Championship[] = [];
  seasonChampionships: Championship[] = [];
  dataSourceChampionship = new MatTableDataSource(this.seasonChampionships) ;
  displayedColumnsSeason: string[] = [ 'img', 'nome', 'giocate', 'vittorie', 'pareggi', 'sconfitte',  'meteFatti'!, 'puntiFatti', 'puntiSubiti','differenza' ,'punti' ];

  @ViewChild(MatSort)
  sort!: MatSort;
  element: any;
  hideForResponsive = false;
  hideForResponsivePhone = false;
  squadre: Squadre[] = [];
  gironeSquadre: Squadre[] = [];
  displayedColumns: string[] = [ 'img', 'nome', 'giocate', 'vittorie', 'pareggi', 'sconfitte',  'meteFatti'!, 'puntiFatti', 'puntiSubiti','differenza' ,'punti' ];
  dataSource = new MatTableDataSource(this.gironeSquadre) ;
  stored:any;
  activeButton: string | null = null;

  constructor(private championshipService: ChampionshipService,private seasonService: SeasonService, private route: ActivatedRoute,private router: Router,private squadraServiceService: SquadraServiceService,private responsive: BreakpointObserver) { }
 
  ngOnInit()  {
    this.seasonService.findAll().subscribe(data => {
      this.seasons = data;
      this.dataSourceSeason = this.seasons ;
    
    });
    this.stored = sessionStorage.getItem('seasonId');
    if (this.stored) {
      this.activeSeasonId = parseInt(this.stored, 10);
    }
    //AUTOMATICALLY LOAD LATEST TABLE
  //  else {
  //    this.activeSeasonId = this.seasons[0].id;
   //   this.selectSeason(this.seasons[0].id);
 //   }
 

  // this.squadraServiceService.findAll().subscribe(data => {
  //   this.squadre = data;
  //   this.gironeSquadre = this.squadre
  //   .filter((element) => element.girone === 1)
  //   .sort((a, b) => {
  //     const puntiA = a.punti;
  //     const puntiB = b.punti;
  //     const diffA = a.differenza;
  //     const diffB = b.differenza;
  //     if (puntiA !== puntiB) {
  //       return puntiB - puntiA; // Sort by punti in descending order
  //     }
  //     return diffA - diffB; // If punti are equal, sort by differenza in ascending order
  //   });
  //   this.dataSource = new MatTableDataSource<Squadre>(this.gironeSquadre);
  //   this.dataSource.sort = this.sort;
  // });

  this.responsive.observe([
    Breakpoints.TabletPortrait,
    Breakpoints.TabletLandscape,
    Breakpoints.HandsetLandscape,
    Breakpoints.HandsetPortrait])
    .subscribe(result => {
      this.hideForResponsive = false;
      this.hideForResponsivePhone = false;
      const breakpoints = result.breakpoints;
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

  getPath(name: String): String {
    return "../../../assets/" + name + ".jpg";
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

  // isActive(number: number): boolean {
  //   const convert = number.toString();
  //   console.log('CONVERT:', convert);
  //   return this.activeButton === convert;
  // }

  selectSeason(id: number): void {
    const getSessionSeasonId = sessionStorage.getItem('seasonId');  
    if(getSessionSeasonId){
      this.activeSeasonId = parseInt(getSessionSeasonId, 10)

      if(this.activeSeasonId === id) {
        const segments = this.router.url.split('/');
const currentPage = segments[1]; // ← 'classifica'
this.router.navigate([currentPage, id]);
       //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
     //       this.router.navigate(['classifica', id]);
       //     this.router.navigate([id], { relativeTo: this.route });
     //     });
      } 
      else {
        this.activeSeasonId = id;
        sessionStorage.setItem('seasonId', id.toString());
     //   this.router.navigate(['classifica', id]);
     this.router.navigate([id], { relativeTo: this.route });
      }
    }
    else{
      this.activeSeasonId = id;
      sessionStorage.setItem('seasonId', id.toString());
    //  this.router.navigate(['classifica', id]);
    this.router.navigate([id], { relativeTo: this.route });
    }
  }


  isActiveSeason(id: number): boolean {
    return this.activeSeasonId === id; 
  }


}



