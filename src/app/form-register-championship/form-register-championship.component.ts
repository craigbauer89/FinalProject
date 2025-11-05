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

@Component({
  selector: 'app-form-register-championship',
  templateUrl: './form-register-championship.component.html',
  styleUrls: ['./form-register-championship.component.scss']
})
export class FormRegisterChampionshipComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  @ViewChild('f2') form2!: NgForm;
  hide = true;
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  error = undefined;
  seasons: Season[] = [];
  dataSourceSeason = this.seasons;
  championships: Championship[] = [];
  dataSourceChampionship = this.championships;

  activeSeasonModifyId:any;
  seasonsModify: Season[] = [];
  championshipsModify: Championship[] = [];
  activeChampionshipModifyId:any;


  ChampionshipRegisterFormGroup = this._form.group({
    name: ['', Validators.required],
    season: [null as Season | null, Validators.required],
    });

    ChampionshipModifyFormGroup = this._form2.group({
      name: ['', Validators.required],
      });

  
    constructor(private authService: AuthService,private route: ActivatedRoute, private seasonService: SeasonService, private championshipService: ChampionshipService,private router: Router,
      private _form: FormBuilder, private _form2: FormBuilder,public userService: UserService) { 
  
  
      }

      ngOnInit()  {

        this.championshipService.findAll().subscribe(data => {
          this.championships = data;
          this.dataSourceChampionship = this.championships ;
          this.championshipsModify = data;
    
        });

        this.seasonService.findAll().subscribe(data => {
          this.seasons = data;
          this.dataSourceSeason = this.seasons ;
          this.seasonsModify = data;

          // if (this.seasons.length > 0) {
          //   this.ChampionshipRegisterFormGroup.patchValue({
          //     season: this.seasons[0]  // Imposta la prima stagione come valore predefinito
          //   });
          // }
        });
      }

      onSubmit() {

        //const season = this.form.value.season; // Ottieni l'oggetto Season
        // if (season) {
        //   const championship: Championship = {
        //     id: this.championship.id,
        //     name: this.form.value.name,
        //     season: {
        //       id: season.id,      
        //       year: season.year   
        //     }
        //   };
        this.championshipService.addChampionship(this.form.value).subscribe(
          resp => {
            // console.log(resp);
            window.alert("Championship aggiunta");
            this.error = undefined;
            //this.router.navigate(['/partite'])
          },
          err  => {
            console.log(err.error);
            window.alert("Championship gia inserito hello");
            this.error = err.error;
          }
        )
    
      }
    //}

    selectSeasonModify(id: number): void {


      this.activeSeasonModifyId = id; 
      this.championshipService.findAllbySeason(id).subscribe(data => {
        this.championshipsModify = data;
     
      });
  
    }

    selectChampionshipModify(id: number): void {
      this.activeChampionshipModifyId = id; 
      

    }

    onSubmitModify() {
      console.log(this.activeChampionshipModifyId);
      
      this.championshipService.modifyChampionship(this.activeChampionshipModifyId,this.form2.value).subscribe(data => console.log(data));
      console.log(this.form2.value);
      window.alert("Championship Modifichato")


    }


    isActiveSeasonModify(id: number): boolean {
      return this.activeSeasonModifyId === id; 
    }

    isActiveChampionshipModify(id: number): boolean {
      return this.activeChampionshipModifyId === id; 
    }

}
