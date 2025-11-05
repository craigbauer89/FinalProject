import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadIds } from '../Interfaces/LoadIds';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { PictureService } from '../Services/picture.service';
import { LoadIdsService } from '../Services/loadIds.service';
import { UserService } from '../Services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JerseyService } from '../Services/jersey.service';
import { SquadraServiceService } from '../Services/squadra-service.service';
import { Classifica } from '../Interfaces/classifica';
import { Season } from '../Interfaces/season';
import { Championship } from '../Interfaces/championship';
import { ChampionshipService } from '../Services/championship.service';
import { ClassificaService } from '../Services/classifica.service';
import { SeasonService } from '../Services/season.service';

@Component({
  selector: 'app-form-register-laod-id',
  templateUrl: './form-register-laod-id.component.html',
  styleUrls: ['./form-register-laod-id.component.scss']
})

export class FormRegisterLaodIdComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  hide = true;
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  error = undefined;
  classifica1: Classifica | undefined;
  classificaLoads: Classifica [] = [];
  loadIds: LoadIds[] = [];
  dataSourceClassifica = this.loadIds;
  loadId: LoadIds | undefined;
  seasonsModify: Season[] = [];
  activeSeasonModifyId:any;
  championshipsModify: Championship[] = [];
  activeChampionshipModifyId:any;
  activeClassificaId:any;
  seasons: Season[] = [];


  LoadIdsRegisterFormGroup = this._form.group({
  classifica_id: ['', Validators.required],
  // squadra_id: ['', Validators.required],
  });

  constructor(private seasonService: SeasonService, private classificaService: ClassificaService, private championshipService: ChampionshipService,  private pictureService: PictureService, private loadIdsService: LoadIdsService , private route: ActivatedRoute, private SquadreServiceservice: SquadraServiceService,private router: Router,
    private _form: FormBuilder, private responsive: BreakpointObserver, private jerseyService: JerseyService, public userService: UserService) { 
  }

  ngOnInit(): void {

    this.loadIdsService.findAll().subscribe( data => {
      this.loadIds = data;
      this.loadId = this.loadIds[0];
      console.log(data);
    });

    this.seasonService.findAll().subscribe(data => {
      this.seasons = data;
      this.seasonsModify = data;
      // this.seasonsSquadra = data;
      // this.dataSourceSeason = this.seasons ;
    });

  }

  isActiveSeasonModify(id: number): boolean {
    return this.activeSeasonModifyId === id; 
  }

  selectSeasonModify(id: number): void {

    this.activeSeasonModifyId = id; 
    this.championshipService.findAllbySeason(id).subscribe(data => {
      this.championshipsModify = data;
    });

  }

  isActiveChampionshipModify(id: number): boolean {
    return this.activeChampionshipModifyId === id; 
  }

  selectChampionshipModify(id: number): void {
    this.activeChampionshipModifyId = id; 
    this.classificaService.findAllbyChampionship(id).subscribe(data => {
      this.classificaLoads = data;
    });
  }

  onSubmit() {
    console.log("yeeeoooe",this.form.value);
    this.loadIdsService.modifyoadIds(1,this.form.value).subscribe(
      resp => {
    
        window.alert("Landing page Classifica modified");
        this.error = undefined;
        
      },
      err  => {
        console.log(err.error);
        window.alert("Error qua");
        this.error = err.error;
      }
    )

  }

}
