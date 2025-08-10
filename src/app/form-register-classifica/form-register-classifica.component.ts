import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Partite } from 'src/app/Interfaces/partite';
import { Squadre } from 'src/app/Interfaces/squadre';
import { PartiteService } from 'src/app/Services/partite.service';
import { SquadraServiceService } from 'src/app/Services/squadra-service.service';
import { UserService } from 'src/app/Services/user.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Season } from '../Interfaces/season';
import { Championship } from '../Interfaces/championship';
import { ChampionshipService } from '../Services/championship.service';
import { SeasonService } from '../Services/season.service';
import { Classifica } from '../Interfaces/classifica';
import { ClassificaService } from '../Services/classifica.service';

@Component({
  selector: 'app-form-register-classifica',
  templateUrl: './form-register-classifica.component.html',
  styleUrls: ['./form-register-classifica.component.scss']
})
export class FormRegisterClassificaComponent implements OnInit {


  @ViewChild('f') form!: NgForm;
  hide = true;
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  error = undefined;
  season: Season | undefined;
  seasons: Season[] = [];
  activeSeasonId:any;
  

  championships: Championship[] = [];
  classificas: Classifica[] = [];
  dataSourceClassifica = this.classificas;
  dataSourceChampionship = this.championships;


  ClassificaRegisterFormGroup = this._form.group({
    name: ['', Validators.required],
    championship: [null as Championship | null, Validators.required],
   
  
    });

  constructor(private seasonService: SeasonService,private authService: AuthService,private route: ActivatedRoute, private classificaService: ClassificaService, private championshipService: ChampionshipService,private router: Router,
    private _form: FormBuilder, public userService: UserService) { }

    ngOnInit()  {

      

      this.classificaService.findAll().subscribe(data => {
        this.classificas = data;
        this.dataSourceClassifica = this.classificas ;
      });

      this.seasonService.findAll().subscribe(data => {
        this.seasons = data;
       // this.dataSourceSeason = this.seasons ;
      });

    }

    onSubmit() {

    //  const championship = this.form.value.championship; // Ottieni l'oggetto Season
      // if (championship) {
      //   const classifica: Classifica = {
      //     name: this.form.value.name,
      //     championship: {
      //       id: championship.id,      // Passa l'id della stagione
      //       name: championship.name   // Passa l'anno della stagione
      //     }
      //   };
      this.classificaService.addClassifica(this.form.value).subscribe(
        resp => {
          // console.log(resp);
          window.alert("Classifica aggiunta");
          this.error = undefined;
          //this.router.navigate(['/partite'])
        },
        err  => {
          console.log(err.error);
          window.alert("Classifica gia inserito hello");
          this.error = err.error;
        }
      )
  
    }

    selectSeason(id: number): void {
      this.activeSeasonId = id; 
      this.championshipService.findAllbySeason(id).subscribe(data => {
        this.championships = data;
        this.dataSourceChampionship = this.championships ;
  
      });
  
    }
  
  
    isActiveSeason(id: number): boolean {
      return this.activeSeasonId === id; 
    }
  //}
}

