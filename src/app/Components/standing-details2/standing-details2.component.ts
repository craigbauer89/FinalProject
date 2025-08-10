import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Championship } from 'src/app/Interfaces/championship';
import { Season } from 'src/app/Interfaces/season';
import { ChampionshipService } from 'src/app/Services/championship.service';
import { SeasonService } from 'src/app/Services/season.service';
import { ClassificaService } from 'src/app/Services/classifica.service';
import { Classifica } from 'src/app/Interfaces/classifica';

@Component({
  selector: 'app-standing-details2',
  templateUrl: './standing-details2.component.html',
  styleUrls: ['./standing-details2.component.scss']
})
export class StandingDetails2Component implements OnInit {


   seasonid!: number;
   groupid!: number;
    season!: Season;
    championship!: Championship;
    championships!: Championship[];
    classifica!: Classifica;
    classifiche!: Classifica[];
    filteredChampionship!: Championship[];
    leagueid!: number;
    group!: string;
    activeButton: string | null = null;
    activeChampionshipId:any;
    activeClassficaId:any;


  constructor(private classificaService: ClassificaService, private router: Router,private championshipService: ChampionshipService, private seasonService: SeasonService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get all championships
   
  
      // Now that championships are loaded, filter based on seasonid
      this.route.params.subscribe(params => {
        console.log('Route Params:', params);
        this.seasonid = parseInt(params['season'], 10); // Base 10 ensures it converts as a decimal number
        this.leagueid = parseInt(params['league'], 10); 
      
  
        console.log('Championship ID:', this.leagueid);
  
        // You can safely filter championships here, since `this.championships` is now populated
     
        this.classificaService.findAllbyChampionship(this.leagueid).subscribe(data => {
          this.classifiche = data;
          console.log('All Championships:', this.championships);
          if (this.classifiche.length > 0) {
            this.selectClassifica(this.classifiche[0].id);
          }
      
      });

      
      
    });
  }

  scrollleft3() {
    const slidesContainer = document.getElementById("slides-container3");
    const slide = document.querySelector(".slide3");
    const prevButton = document.getElementById("slide-arrow-prev3");
    const nextButton = document.getElementById("slide-arrow-next3");
    if (slide != null && slidesContainer != null) {
      const slideWidth = slide.clientWidth;
      slidesContainer.scrollLeft -= slideWidth;
    }
  }

  scrollright3() {
    const slidesContainer = document.getElementById("slides-container3");
    const slide = document.querySelector(".slide3");
    const prevButton = document.getElementById("slide-arrow-prev3");
    const nextButton = document.getElementById("slide-arrow-next3");
    if (slide != null && slidesContainer != null) {
      const slideWidth = slide.clientWidth;
      slidesContainer.scrollLeft += slideWidth;
      }
  }

  isActive(number: number): boolean {
    const convert = number.toString();
  
  
    console.log('group numner:', convert);
    console.log('Active Button number:', this.activeButton);
  
    return this.activeButton === convert;
  
  }

  selectClassifica(id: number): void {
    this.activeClassficaId = id;
   this.classificaService.findById(id).subscribe(data => {
    this.classifica = data;
    console.log('Classfica data:', data);
    console.log('season id:', this.seasonid);
    console.log('championship id:', this.leagueid);
    console.log('Classfica id:', this.classifica?.id);
    console.log('group laads :', this.group);
    // need to pass in the same season id 
   this.router.navigate([this.classifica?.id], { relativeTo: this.route });
  // this.router.navigate(['classifica', this.championship?.season.id, this.championship?.id,this.classifica?.id]);
    });


  }

  isActiveClassfica(id: number): boolean {
    return this.activeClassficaId === id;
  }


}
