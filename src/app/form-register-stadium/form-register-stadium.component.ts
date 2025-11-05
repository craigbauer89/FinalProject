import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SquadraServiceService } from '../Services/squadra-service.service';
import { JerseyService } from '../Services/jersey.service';
import { stadiumService } from '../Services/stadium.service';
import { UserService } from '../Services/user.service';
import { Squadre } from '../Interfaces/squadre';
import { Season } from '../Interfaces/season';
import { Championship } from '../Interfaces/championship';
import { Classifica } from '../Interfaces/classifica';
import { Picture } from '../Interfaces/picture';
import { PictureService } from '../Services/picture.service';

@Component({
  selector: 'app-form-register-stadium',
  templateUrl: './form-register-stadium.component.html',
  styleUrls: ['./form-register-stadium.component.scss']
})
export class FormRegisterStadiumComponent implements OnInit {

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
  squadre: Squadre [] = [];

  championships: Championship[] = [];
  classificas: Classifica[] = [];
  dataSourceClassifica = this.classificas;
  dataSourceChampionship = this.championships;
  picture: Picture [] = [];



   StadiumRegisterFormGroup = this._form.group({
      name: ['', Validators.required],
      indirizzo: ['', Validators.required],
      allenatore: ['', Validators.required],
      telefono: ['', Validators.required],
      sito: ['', Validators.required],
      picture: [null as Picture | null, Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
    //  squadre: [null as Squadre | null, Validators.required],
     
    
      });

  constructor(private pictureService: PictureService,private stadiumService: stadiumService, private route: ActivatedRoute, private SquadreServiceservice: SquadraServiceService,private router: Router,
    private _form: FormBuilder, private responsive: BreakpointObserver, private jerseyService: JerseyService, public userService: UserService) { 

      // this.squadra = new Squadre();
    }

  ngOnInit(): void {

this.SquadreServiceservice.findAll().subscribe( data => {
this.squadre = data;
console.log(data);
});

this.pictureService.findAll().subscribe( data => {
  this.picture = data;
  console.log(data);
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
      this.stadiumService.addstadium(this.form.value).subscribe(
        resp => {

          window.alert("Stadium aggiunta");
          this.error = undefined;

        },
        err  => {
          console.log(err.error);
          window.alert("Stadium gia inserito hello");
          this.error = err.error;
        }
      )
  
    }

}
