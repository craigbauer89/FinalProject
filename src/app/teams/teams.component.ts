import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../Services/teams.service';
import { Squadre } from 'src/app/Interfaces/squadre';
import { JerseyService } from '../Services/jersey.service';
import { Jersey } from '../Interfaces/jersey';
import { NgModule } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material/table';
import { PartiteService } from 'src/app/Services/partite.service';
import { SquadraServiceService } from 'src/app/Services/squadra-service.service';

import { Partite } from '../Interfaces/partite';
import { Router } from '@angular/router';
import { Season } from '../Interfaces/season';
import { SeasonService } from '../Services/season.service';
import { ChampionshipService } from '../Services/championship.service';
import { Championship } from '../Interfaces/championship';
import { Classifica } from '../Interfaces/classifica';
import { ClassificaService } from '../Services/classifica.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})



export class TeamsComponent implements OnInit {


  leagueid!: number;
   classifica!: Classifica;
      classifiche!: Classifica[];
   seasonid!: number;
    season2!: Season;
    championship!: Championship;
    championships!: Championship[];
  squadre: Squadre | undefined;
  squadres: Squadre[] = [];
  gameForm: Number [] = [];
  squadraPartite: Partite[] = [];
  squadraFixtures: Partite[] = [];
  jersey: Jersey[] = [];
  team: any;
  partita: Partite | undefined;
  partite: Partite[] = [];
  hideForResponsive = false;
  hideForResponsivePhone = false;
  displayedColumnsFixtures: string[] = [ 'date','img1', 'squadra1.nome','seperator','squadra2.nome', 'img2' ];
  displayedColumnsResults: string[] = [ 'date','img1', 'squadra1.nome', 'puntisquadra1','metesquadra1', 'seperator', 'puntisquadra2', 'metesquadra2', 'squadra2.nome', 'img2' ];
  dataPartite: Partite[] = [];
  dataSourceResults = new MatTableDataSource(this.squadraPartite) ;
  fixturesDataSource = new MatTableDataSource(this.squadraFixtures) ;
  displayedColumns: string[] = [ 'img', 'nome', 'giocate', 'vittorie', 'pareggi', 'sconfitte',  'meteFatti'!, 'puntiFatti', 'puntiSubiti','differenza' ,'punti' ];
  dataSource2 = new MatTableDataSource(this.squadres) ;

  activeSeasonId:any;
  season: Season | undefined;
  seasons: Season[] = [];
  dataSourceSeason = this.seasons;


  constructor(private squadreService2: TeamsService, private classificaService: ClassificaService,private championshipService: ChampionshipService,private seasonService: SeasonService,private router: Router,private squadreService: SquadraServiceService, private partiteService: PartiteService,private teamsService: TeamsService, private responsive: BreakpointObserver, private jerseyService: JerseyService) { }

  ngOnInit(): void {

    const stored = sessionStorage.getItem('seasonIdTeams');
    if (stored) {
      this.activeSeasonId = parseInt(stored, 10);
    }
  this.seasonService.findAll().subscribe(data => {
    this.seasons = data;
    this.dataSourceSeason = this.seasons ;
  });


    this.squadreService.findAll().subscribe(data => {
      this.squadres = data;
      
    });

    this.teamsService.findById(1).subscribe(data => {
        this.squadre = data;
        this.team = data.nome;
        console.log('Fetched squadre:', this.squadre);
    this.partiteService.findAllBySquadra(this.squadre.id).subscribe(data=> {
       
        const oggi = new Date();
        const setDate = new Date("2022-11-13");
        const newdate2 = new Date(data[1].date);
        console.log('NEWDATE:', oggi);//Tue Aug 05 2025 10:22:48 GMT+0200 (Central European Summer Time)
        console.log('NEWDATE2:', data[1].date); //"2022-12-18"
        console.log('NEWDATE3:', newdate2); //Sun Dec 18 2022 01:00:00 GMT+0100 (Central European Standard Time)
        console.log('NEWDATE4:', setDate); //Sun Dec 18 2022 01:00:00 GMT+0100 (Central European Standard Time)

        this.squadraPartite = data.filter((partita: Partite) => {
          return new Date(partita.date) <= setDate;
        });
        this.dataSourceResults.data = this.squadraPartite;

        this.squadraFixtures = data.filter((partita: Partite) => {
          return new Date(partita.date) > setDate;
          
        });
        this.fixturesDataSource.data = this.squadraFixtures;
        console.log('squadraFixtures:', this.squadraFixtures);

        
    });
       // this.gameForm = this.squadre.awaygames
  
      this.jerseyService.findAll().subscribe(data => {
        this.jersey = data;
        console.log(data)
      });

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
      if (breakpoints[Breakpoints.HandsetPortrait]) {
      // this.hideForResponsivePhone = true;
      // this.hideForResponsive = true;
      // this.displayedColumns = [ 'squadra1.nome', 'puntisquadra1', 'seperator','puntisquadra2', 'squadra2.nome' ];
      }
      
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

  selectSeason(id: number): void {
    this.dataSource2.data =[];
    this.activeSeasonId = id;
    this.seasonService.findById(id).subscribe(data => {
      const year = data.year

      this.classificaService.findAllbySquadra(1, year).subscribe(data2 => {
        this.classifiche = data2;
      
        if (data2 && data2.length > 0) {
          this.squadreService2.findAllbyClassifica(data2[0].id).subscribe(data => {
            this.squadres = data;
            this.dataSource2.data =this.squadres;
          });
        } else {
          console.warn('Nessuna classifica trovata per la squadra 27 e anno:', year);
          this.squadres = []; // o altro comportamento
        }
      });
      
    });

  


    // const getSessionSeasonId = sessionStorage.getItem('seasonIdTeams');  
    // if(getSessionSeasonId){
    //   this.activeSeasonId = parseInt(getSessionSeasonId, 10)

    //   if(this.activeSeasonId === id) {
    //       this.router.navigate(['/teams', id]);
    //   } 
    //   else {
    //     this.activeSeasonId = id;
    //     sessionStorage.setItem('seasonIdTeams', id.toString());
    //     this.router.navigate(['/teams', id]);
    //   }
    // }
    // else{
    //   this.activeSeasonId = id;
    //   sessionStorage.setItem('seasonIdTeams', id.toString());
    //   this.router.navigate(['/teams', id]);
    // }
  }


  isActiveSeason(id: number): boolean {
    return this.activeSeasonId === id; 
  }


}
