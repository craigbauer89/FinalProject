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
import { Jersey } from '../Interfaces/jersey';
import { JerseyService } from '../Services/jersey.service';

@Component({
  selector: 'app-form-register-jersey',
  templateUrl: './form-register-jersey.component.html',
  styleUrls: ['./form-register-jersey.component.scss']
})
export class FormRegisterJerseyComponent implements OnInit {


  @ViewChild('f') form!: NgForm;
  hide = true;
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  error = undefined;

  jerseys: Jersey[] = [];
  dataSourceJersey = this.jerseys;

  JerseyRegisterFormGroup = this._form.group({
    color: ['', Validators.required],
   
  
    });

  constructor(private authService: AuthService,private route: ActivatedRoute, private classificaService: ClassificaService, private jerseyService: JerseyService,private router: Router,
    private _form: FormBuilder, public userService: UserService) { }

  ngOnInit(): void {

    this.jerseyService.findAll().subscribe(data => {
      this.jerseys = data;
      this.dataSourceJersey = this.jerseys ;
    });
  }

  onSubmit() {

  
      this.jerseyService.addJersey(this.form.value).subscribe(
        resp => {
 
          window.alert("Classifica aggiunta");
          this.error = undefined;
     
        },
        err  => {
          console.log(err.error);
          window.alert("Classifica gia inserito hello");
          this.error = err.error;
        }
      )
  
    }

}
