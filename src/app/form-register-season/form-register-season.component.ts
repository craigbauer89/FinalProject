import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Season } from '../Interfaces/season';
import { Championship } from '../Interfaces/championship';
import { ChampionshipService } from '../Services/championship.service';
import { SeasonService } from '../Services/season.service';


@Component({
  selector: 'app-form-register-season',
  templateUrl: './form-register-season.component.html',
  styleUrls: ['./form-register-season.component.scss']
})
export class FormRegisterSeasonComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  hide = true;
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  error = undefined;
  

  season: Season | undefined;
  championships: Championship[] = [];
  dataSource = this.championships;

  SeasonRegisterFormGroup = this._form.group({
  year: ['', Validators.required],
  // championships: ['', Validators.required],
 

  });

  constructor(private authService: AuthService,private route: ActivatedRoute, private seasonService: SeasonService, private championshipService: ChampionshipService,private router: Router,
    private _form: FormBuilder, public userService: UserService) { 


    }

   
    ngOnInit()  {

      this.championshipService.findAll().subscribe(data => {
        this.championships = data;
        this.dataSource = this.championships ;
  
      });
    }

  onSubmit() {

    

    this.seasonService.addSeason(this.form.value).subscribe(
      resp => {
        // console.log(resp);
        window.alert("Season aggiunta");
        this.error = undefined;
        //this.router.navigate(['/partite'])
      },
      err  => {
        console.log(err.error);
        window.alert("Season gia inserito");
        this.error = err.error;
      }
    )

  }

}



