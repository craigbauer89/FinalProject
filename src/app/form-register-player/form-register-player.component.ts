import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SquadraServiceService } from '../Services/squadra-service.service';
import { JerseyService } from '../Services/jersey.service';
import { UserService } from '../Services/user.service';
import { PlayerService } from '../Services/player.service';
import { Squadre } from '../Interfaces/squadre';
import { Picture } from '../Interfaces/picture';
import { PictureService } from '../Services/picture.service';

@Component({
  selector: 'app-form-register-player',
  templateUrl: './form-register-player.component.html',
  styleUrls: ['./form-register-player.component.scss']
})
export class FormRegisterPlayerComponent implements OnInit {

   @ViewChild('f') form!: NgForm;
    hide = true;
    checked = false;
    indeterminate = false;
    labelPosition: 'before' | 'after' = 'after';
    disabled = false;
    error = undefined;
    activeSeasonId:any;
    squadre: Squadre [] = [];
    picture: Picture [] = [];
  
  
  
     PlayerRegisterFormGroup = this._form.group({
        name: ['', Validators.required],
        tries: ['', Validators.required],
        gialli: ['', Validators.required],
        rossi: ['', Validators.required],
         picture: [null as Picture | null, Validators.required],
        squadre: [null as Squadre | null, Validators.required],
       
      
        });

  constructor(private pictureService: PictureService,private playerService: PlayerService, private route: ActivatedRoute, private SquadreServiceservice: SquadraServiceService,private router: Router,
    private _form: FormBuilder, private responsive: BreakpointObserver, private jerseyService: JerseyService, public userService: UserService) { 

      // this.squadra = new Squadre();
    }

  ngOnInit(): void {

    this.SquadreServiceservice.findAll().subscribe( data => {
      this.squadre = data;
      });

      this.pictureService.findAll().subscribe( data => {
        this.picture = data;
        console.log(data);
        });

  }

  onSubmit() {

 
      this.playerService.addPlayer(this.form.value).subscribe(
        resp => {

          window.alert("Player aggiunta");
          this.error = undefined;

        },
        err  => {
          console.log(err.error);
          window.alert("Player gia inserito hello");
          this.error = err.error;
        }
      )
  
    }

}
