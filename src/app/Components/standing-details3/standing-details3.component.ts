import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Championship } from 'src/app/Interfaces/championship';
import { Classifica } from 'src/app/Interfaces/classifica';
import { Pariticpation } from 'src/app/Interfaces/participation';
import { Season } from 'src/app/Interfaces/season';
import { Squadre } from 'src/app/Interfaces/squadre';
import { ChampionshipService } from 'src/app/Services/championship.service';
import { ClassificaService } from 'src/app/Services/classifica.service';
import { SeasonService } from 'src/app/Services/season.service';
import { SquadraServiceService } from 'src/app/Services/squadra-service.service';
import { TeamsService } from 'src/app/Services/teams.service';
import { ParticipationService } from 'src/app/Services/participation.service';


@Component({
  selector: 'app-standing-details3',
  templateUrl: './standing-details3.component.html',
  styleUrls: ['./standing-details3.component.scss']
})
export class StandingDetails3Component implements OnInit {

  seasonid!: number;
      season!: Season;
      league!: Championship;
      championships!: Championship[];
      classifica!: Classifica;
      classifiche!: Classifica[];
      filteredChampionship!: Championship[];
      leagueid!: number;
      groupid!: number;
      squadre!: Squadre[];
      participazioni!: Pariticpation[];

      activeSeasonId:any;
       seasonChampionships: Championship[] = [];
        dataSourceChampionship = new MatTableDataSource(this.seasonChampionships) ;
        displayedColumnsSeason: string[] = [ 'img', 'nome', 'giocate', 'vittorie', 'pareggi', 'sconfitte',  'meteFatti'!, 'puntiFatti', 'puntiSubiti','differenza' ,'punti' ];
      
      @ViewChild(MatSort)
        sort!: MatSort;
        element: any;
        hideForResponsive = false;
        hideForResponsivePhone = false;
        gironeSquadre: Squadre[] = [];
        gironeParticipation: Pariticpation[] = [];
        displayedColumns: string[] = [ 'img', 'nome', 'giocate', 'vittorie', 'pareggi', 'sconfitte',  'meteFatti'!, 'puntiFatti', 'puntiSubiti','differenza' ,'punti' ];
        dataSource = new MatTableDataSource(this.gironeSquadre) ;
        dataSource2 = new MatTableDataSource(this.gironeParticipation) ;

        activeButton: string | null = null;

  constructor(private participationService: ParticipationService, private squadraServiceService: SquadraServiceService,private responsive: BreakpointObserver,private squadreService: TeamsService, private router: Router,private championshipService: ChampionshipService, private seasonService: SeasonService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    // Get all championships
   
  
      // Now that championships are loaded, filter based on seasonid
      this.route.params.subscribe(params => {
        console.log('Route Params:', params);
        this.seasonid = parseInt(params['season'], 10); // Base 10 ensures it converts as a decimal number
        this.leagueid = parseInt(params['league'], 10);  // Same for leagueid
        this.groupid = parseInt(params['group'], 10);
  
      
  
        // You can safely filter championships here, since `this.championships` is now populated
     
        this.squadreService.findAllbyClassifica(this.groupid).subscribe(data => {
          this.squadre = data;
          this.gironeSquadre = this.squadre
          console.log('All Championships:', this.championships);
     
          this.dataSource = new MatTableDataSource<Squadre>(this.gironeSquadre);

      });

      this.participationService.findAllByClassifcaId(this.groupid).subscribe(data => {
        this.participazioni = data;
        this.gironeParticipation = this.participazioni
    
   
      
        this.dataSource2 = new MatTableDataSource<Pariticpation>(this.gironeParticipation);

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
          this.hideForResponsivePhone = true;
          this.hideForResponsive = true;
          this.displayedColumns = [ 'img', 'nome', 'punti', 'giocate', 'differenza' ];
        }
      
      });

  }

  getPath(name: String): String {
    return "../../../assets/" + name + ".jpg";
  }

  girone(girone:number) {
    console.log("heelo", girone);
    this.activeButton = girone.toString();
    this.squadraServiceService.findAll().subscribe(data => {
      this.squadre = data;
      this.gironeSquadre.splice(0,this.gironeSquadre.length);
      this.squadre.forEach(element => {
        if(element.girone == girone) {
          this.gironeSquadre.push(element)
        }
      });
        this.dataSource = new MatTableDataSource(this.gironeSquadre) ;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
    });
  }




}
