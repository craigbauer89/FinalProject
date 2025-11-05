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
  @ViewChild('f2') form2!: NgForm;
  @ViewChild('f3') form3!: NgForm;
  @ViewChild('f4') form4!: NgForm;
  hide = true;
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  error = undefined;
  season: Season | undefined;
  seasons: Season[] = [];
  seasonsModify: Season[] = [];
  seasonsSquadra: Season[] = [];
  activeSeasonId:any;
  activeSeasonModifyId:any;
  activeSeasonSquadraId:any;
  activeClassificaId:any;
  activeClassificaSquadraId:any;
  activeChampionshipModifyId:any;
  activeChampionshipSquadraId:any;
  classifica:Classifica | undefined;
  classificaSquadra:Classifica | undefined;
  modifybox = false;
  squadre: Squadre[] = [];
  squadreclassifica: Squadre[] = [];
  
  championshipsModify: Championship[] = [];
  championshipsSquadra: Championship[] = [];
  championships: Championship[] = [];
  classificas: Classifica[] = [];
  classificasSquadra: Classifica[] = [];
  dataSourceClassifica = this.classificas;
  //dataSourceChampionship = this.championships;


  ClassificaRegisterFormGroup = this._form.group({
    name: ['', Validators.required],
    championship: [null as Championship | null, Validators.required],

    });

  ClassificaModifyFormGroup = this._form2.group({
    name: ['', Validators.required],
    // championship: [null as Championship | null, Validators.required],
    
    });

  ClassificaSquadraFormGroup = this._form3.group({
    squadra: [null as Squadre | null, Validators.required],
  
  });

  ClassificaCancellaSquadraFormGroup = this._form4.group({
    squadra: [null as Squadre | null, Validators.required],
  
  });

  constructor(private squadraService: SquadraServiceService,private seasonService: SeasonService,private authService: AuthService,private route: ActivatedRoute, private classificaService: ClassificaService, private championshipService: ChampionshipService,private router: Router,
    private _form: FormBuilder,private _form2: FormBuilder, private _form3: FormBuilder,private _form4: FormBuilder, public userService: UserService) { }

    ngOnInit()  {

      

  

      this.seasonService.findAll().subscribe(data => {
        this.seasons = data;
        this.seasonsModify = data;
        this.seasonsSquadra = data;
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

    onSubmitModify() {
      console.log(this.activeChampionshipModifyId);
      
      this.classificaService.modifyClassifica(this.activeClassificaId, this.form2.value,this.activeChampionshipModifyId)
      .subscribe(data => console.log(data));
      this.modifybox = false;
      console.log(this.form2.value);
      window.alert("Classifica Modifichato")


    }

    onSubmitSquadra() {
      console.log(this.activeChampionshipModifyId);
      
      this.classificaService.addClassificaSquadra(this.activeClassificaSquadraId,this.form3.value.squadra)
      .subscribe(data => console.log(data));
      this.modifybox = false;
      console.log(this.form3.value);
      window.alert("Squadra Inserito")


    }

    onSubmitRemoveSquadra() {
     // console.log("this be the active id ",this.activeChampionshipModifyId);
      console.log("this be the form value . squadra",this.form4.value.squadra);
      this.classificaService.cancellaClassificaSquadra(this.activeClassificaSquadraId,this.form4.value.squadra)
      .subscribe(data => console.log("data",data));
      this.modifybox = false;
      console.log("this be the form value",this.form4.value);
      window.alert("Squadra Inserito")


    }

    selectSeason(id: number): void {
      this.activeSeasonId = id; 
      this.championshipService.findAllbySeason(id).subscribe(data => {
        this.championships = data;
      //  this.dataSourceChampionship = this.championships ;
  
      });
  
    }

    selectSeasonModify(id: number): void {


      this.activeSeasonModifyId = id; 
      this.championshipService.findAllbySeason(id).subscribe(data => {
        this.championshipsModify = data;
     
      });
  
    }

    selectSeasonSquadra(id: number): void {


      this.activeSeasonSquadraId = id; 
      this.championshipService.findAllbySeason(id).subscribe(data => {
        this.championshipsSquadra = data;
     
      });
  
    }


    selectChampionshipModify(id: number): void {
      this.activeChampionshipModifyId = id; 
      this.classificaService.findAllbyChampionship(id).subscribe(data => {
        this.classificas = data;
        this.dataSourceClassifica = this.classificas ;
      });

  
    }

    selectChampionshipSquadra(id: number): void {
      this.activeChampionshipSquadraId = id; 
      this.classificaService.findAllbyChampionship(id).subscribe(data => {
        this.classificasSquadra = data;
       // this.dataSourceClassifica = this.classificas ;
      });

  
    }

    selectClassifica(id: number): void {
      this.activeClassificaId = id; 
      this.classificaService.findById(id).subscribe(data => {
        this.classifica = data;
      //  this.dataSourceChampionship = this.championships ;
  
      });
  
    }

    selectClassificaSquadra(id: number): void {


this.squadraService.getByClassificaId(id).subscribe(data => {
  this.squadreclassifica = data;
});

      this.activeClassificaSquadraId = id; 
      this.classificaService.findById(id).subscribe(data => {
        this.classificaSquadra = data;
      //  this.dataSourceChampionship = this.championships ;
  
      });

      this.squadraService.findAll().subscribe(data => {
        this.squadre = data;
  
      });
  
    }
  
  
    isActiveSeason(id: number): boolean {
      return this.activeSeasonId === id; 
    }

    isActiveSeasonModify(id: number): boolean {
      return this.activeSeasonModifyId === id; 
    }

    isActiveSeasonSquadra(id: number): boolean {
      return this.activeSeasonSquadraId === id; 
    }

    isActiveChampionshipModify(id: number): boolean {
      return this.activeChampionshipModifyId === id; 
    }

    isActiveChampionshipSquadra(id: number): boolean {
      return this.activeChampionshipSquadraId === id; 
    }



    isActiveClassifica(id: number): boolean {
      return this.activeClassificaId === id; 
    }

    isActiveClassificaSquadra(id: number): boolean {
      return this.activeClassificaSquadraId === id; 
    }
  //}
}

