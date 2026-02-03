import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Championship } from 'src/app/Interfaces/championship';
import { Season } from 'src/app/Interfaces/season';
import { ChampionshipService } from 'src/app/Services/championship.service';
import { SeasonService } from 'src/app/Services/season.service';

@Component({
  selector: 'app-standing-details',
  templateUrl: './standing-details.component.html',
  styleUrls: ['./standing-details.component.scss']
})
export class StandingDetailsComponent implements OnInit {

  selectedChampionshipId!: number;
  seasonid!: number;
  season!: Season;
  championship!: Championship;
  championships!: Championship[];
  filteredChampionship!: Championship[];
  leagueid!: number;
  league!: Championship;
  group!: string;
  activeButton: string | null = null;
  activeChampionshipId:any;
  stored:any;
  activeButtonChampionshipId:any;

  constructor(private router: Router,private championshipService: ChampionshipService, private seasonService: SeasonService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.stored = sessionStorage.getItem('championshipbuttonId');
    if (this.stored) {
      this.activeButtonChampionshipId = parseInt(this.stored, 10);
    }
    //AUTOMATICALLY LOAD LATEST TABLE
    //  else {
    //  }
   
    this.route.params.subscribe(params => {
      this.seasonid = parseInt(params['season'], 10); // Base 10 ensures it converts as a decimal number
      console.log('Season ID:', this.seasonid);

      this.championshipService.findAllbySeason(this.seasonid).subscribe(data => {
        this.championships = data;
        console.log('All Championships:', this.championships);
        //  this.selectChampionship(this.championships[0].id)
        // Forza la selezione del primo campionato anche se è lo stesso
        if (this.championships.length > 0) {
            this.selectChampionship(this.championships[0].id);
        }
      });
    });
   

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

  isActive(number: number): boolean {
    const convert = number.toString();
  
  
    console.log('group numner:', convert);
    console.log('Active Button number:', this.activeButton);
  
    return this.activeButton === convert;
  
  }

  selectChampionship(id: number): void {
     const stored = sessionStorage.getItem('championshipbuttonId');
    if (stored) {
      this.activeButtonChampionshipId = parseInt(stored, 10);
    
      this.championshipService.findById(id).subscribe(data => {
        this.championship = data;

        if (this.activeChampionshipId === id) {
          const segments = this.router.url.split('/');
          const currentPage = segments[1]; // ← 'classifica'
          this.router.navigate([currentPage, id]);
        //  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        //    this.router.navigate(['classifica', this.championship?.season.id, this.championship?.id]);
       //   });
        } 
        else {
          sessionStorage.setItem('championshipId', id.toString());
          this.activeChampionshipId = id;
       //   this.router.navigate(['classifica', this.championship?.season.id, this.championship?.id]);
       this.router.navigate([id], { relativeTo: this.route });
      }

      });
    }  
    else {
      this.championshipService.findById(id).subscribe(data => {
        this.championship = data;
        sessionStorage.setItem('championshipId', id.toString());
        this.activeChampionshipId = id;
        this.activeButtonChampionshipId = id;
        this.router.navigate([id], { relativeTo: this.route });
     //   this.router.navigate(['classifica', this.championship?.season.id, this.championship?.id]);
      });
    }

  }

  isActiveChampionship(id: number): boolean {
    
    return this.activeButtonChampionshipId === id;
    
  }


onChampionshipChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value;
  this.selectedChampionshipId = +value; // converte in number

  this.selectChampionship(this.selectedChampionshipId);

}



}
