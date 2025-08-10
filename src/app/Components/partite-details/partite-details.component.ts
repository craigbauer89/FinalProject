import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Championship } from 'src/app/Interfaces/championship';
import { Classifica } from 'src/app/Interfaces/classifica';
import { Partite } from 'src/app/Interfaces/partite';
import { Season } from 'src/app/Interfaces/season';
import { Squadre } from 'src/app/Interfaces/squadre';
import { AuthService } from 'src/app/Services/auth.service';
import { ChampionshipService } from 'src/app/Services/championship.service';
import { ClassificaService } from 'src/app/Services/classifica.service';
import { PartiteService } from 'src/app/Services/partite.service';
import { SeasonService } from 'src/app/Services/season.service';
import { SquadraServiceService } from 'src/app/Services/squadra-service.service';

@Component({
  selector: 'app-partite-details',
  templateUrl: './partite-details.component.html',
  styleUrls: ['./partite-details.component.scss']
})
export class PartiteDetailsComponent implements OnInit {

  activeDate:any;
  squadreforName: Squadre | undefined;
  partita: Partite | undefined;
  classifiche: Classifica[]| undefined;
  championships: Championship[]| undefined;
  seasons: Season[]| undefined;
  currentYear = new Date().getFullYear(); 
  partitaYear = new Date().getFullYear(); 
  activeChampionshipId:any;
  seasonid!: number;
  championship!: Championship;
  season: Season | undefined;
  activeSeasonId:any;
  partite_2: Partite[] = [];
  partite: Partite[] = [];
  partite_3: Date [] = [];
  private alreadyNavigated = false;

  constructor(private seasonService: SeasonService, private championshipService: ChampionshipService,private classificaService: ClassificaService,private partiteService: PartiteService, private SquadreServiceservice: SquadraServiceService, private _form: FormBuilder, private router: Router, private authService: AuthService, private responsive: BreakpointObserver, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.seasonService.findAll().subscribe(data => {
      this.seasons = data;
    });

    this.route.params.subscribe(params => {
      this.seasonid = parseInt(params['season'], 10);
      console.log('Season ID:', this.seasonid);
  
      this.seasonService.findById(this.seasonid).subscribe({
        next: data => {
          this.currentYear = parseInt(data.year, 10);
          console.log('Current year :', this.currentYear);
  
          console.log('Calling findAllByYear with:', this.currentYear);
  
          this.partiteService.findAllByYear(this.currentYear).subscribe({
            next: data => {
              console.log('Dati ricevuti da findAllByYear:', data); // 👈 questo DEVE apparire
              const uniqueDates = Array.from(
                new Set(data.map(partita => partita.date))
              ).map(date => new Date(date));
  
              this.partite_3 = uniqueDates;
              console.log('PARTITE LIST:', this.partite_3);
              this.selectDate(this.partite_3[0]);
            },
            error: err => {
              console.error('Errore durante findAllByYear:', err);
              if (err.status) {
                console.error('Status:', err.status);
                console.error('Message:', err.message);
                console.error('URL:', err.url);
              }
            },
            complete: () => {
              console.log('Completata la richiesta findAllByYear');
            }
          });
        },
        error: err => {
          console.error('Errore nel caricamento della season:', err);
        }
      });
    });

    
  }
  
  selectDate(date: Date): void {
    this.activeDate = date; 
    console.log('currentyear again:', this.currentYear);
    this.partiteService.findAll().subscribe(data => {
      console.log('partite data:', data);
      this.partite_2 = data.filter(partita => {
        const partitaDate = new Date(partita.date);
        const isSameDate = partitaDate.toDateString() === new Date(this.activeDate).toDateString();
        const isSameYear = partitaDate.getFullYear() === this.currentYear;
      
        return isSameDate && isSameYear;
      });
      console.log('Filtered partite for current year:', this.partite_2);
    });
  
    let seasonYear = this.activeDate.getFullYear().toString();; 
    let champSeasonId: number | undefined;
  
    if(this.seasons) {
      console.log("WE GOT HERE")
      for (let season of this.seasons){
    
        if (season.year === seasonYear.toString()) {
          champSeasonId = season.id;
        }
      }
  
    }
  
    if (champSeasonId === undefined) {
      throw new Error(`No season found for year ${seasonYear}`);
    }
  
    if (champSeasonId) {
      this.router.navigate(['calendario', champSeasonId, date.toISOString().substring(0, 10)]);
    } else {
      console.warn('Season ID is undefined');
    }
  
  }

  scrollleft2() {
    const slidesContainer = document.getElementById("slides-container2");
    const slide = document.querySelector(".slide2");
    const prevButton = document.getElementById("slide-arrow-prev2");
    const nextButton = document.getElementById("slide-arrow-next2");
    if (slide != null && slidesContainer != null) {
      const slideWidth = slide.clientWidth;
      slidesContainer.scrollLeft -= slideWidth;
    }
  }

  scrollright2() {
    const slidesContainer = document.getElementById("slides-container2");
    const slide = document.querySelector(".slide2");
    const prevButton = document.getElementById("slide-arrow-prev2");
    const nextButton = document.getElementById("slide-arrow-next2");
    if (slide != null && slidesContainer != null) {
      const slideWidth = slide.clientWidth;
      slidesContainer.scrollLeft += slideWidth;
      }
  }

  isActiveDate(date: Date): boolean {
    return this.activeDate === date;
  }

}
