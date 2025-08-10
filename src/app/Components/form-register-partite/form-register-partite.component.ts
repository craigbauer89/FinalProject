import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Partite } from 'src/app/Interfaces/partite';
import { Squadre } from 'src/app/Interfaces/squadre';
import { PartiteService } from 'src/app/Services/partite.service';
import { SquadraServiceService } from 'src/app/Services/squadra-service.service';
import { UserService } from 'src/app/Services/user.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Season } from 'src/app/Interfaces/season';
import { SeasonService } from 'src/app/Services/season.service';
import { ChampionshipService } from 'src/app/Services/championship.service';
import { Championship } from 'src/app/Interfaces/championship';
import { Classifica } from 'src/app/Interfaces/classifica';
import { ClassificaService } from 'src/app/Services/classifica.service';


@Component({
  selector: 'app-form-register-partite',
  templateUrl: './form-register-partite.component.html',
  styleUrls: ['./form-register-partite.component.scss']
})
export class FormRegisterPartiteComponent implements OnInit {

 // @ViewChild('f') form!: NgForm;
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
    dataSourceChampionship = this.championships;
    activeChampionshipId:any;
  activeButtonChampionshipId:any;
  classificas: Classifica[] = [];
  

  partite: Partite[] = [];
  squadre: Squadre[] = [];
  dataSource = this.squadre ;

  PartiteRegisterFormGroup = this.form.group({
    date: this.form.control(new Date(), { validators: [Validators.required], nonNullable: true }),
    squadra1: this.form.control<number>(0, { validators: [Validators.required], nonNullable: true }),
    squadra2: this.form.control<number>(0, { validators: [Validators.required], nonNullable: true }),
    puntisquadra1: this.form.control<number>(0, { validators: [Validators.required], nonNullable: true }),
    puntisquadra2: this.form.control<number>(0, { validators: [Validators.required], nonNullable: true }),
    meteSquadra1: this.form.control<number>(0, { validators: [Validators.required], nonNullable: true }),
    meteSquadra2: this.form.control<number>(0, { validators: [Validators.required], nonNullable: true }),
    girone_id: this.form.control<number>(0, { validators: [Validators.required], nonNullable: true }),
  });

  constructor(private classificaService: ClassificaService,private championshipService: ChampionshipService,private seasonService: SeasonService,private authService: AuthService,private route: ActivatedRoute,private Partitaservice: PartiteService, private SquadreServiceservice: SquadraServiceService,private router: Router,
    private form: FormBuilder, public userService: UserService) { 

      // this.squadra = new Squadre();
    }

    test() {

    }

    ngOnInit()  {

      this.seasonService.findAll().subscribe(data => {
        this.seasons = data;
       // this.dataSourceSeason = this.seasons ;
      });

    

    //   this.SquadreServiceservice.modifySquadra(this.form.value.squadra1.id,this.squadre)
    // .subscribe(data => console.log(data));

      this.SquadreServiceservice.findAll().subscribe(data => {
        this.squadre = data;
        // console.log(JSON.stringify(data));
        // console.log(this.squadre[1]);
        // for(let cat in this.squadre) {
          // console.log(this.squadre);
          this.dataSource = this.squadre ;
          // console.log(this.dataSource);

          

        // }
      });
    }

  onSubmit() {
   


   const formValue = this.PartiteRegisterFormGroup.value;

  const partita: Partite = {
    date: formValue.date ?? new Date(),  // fallback to avoid undefined
    squadra1_id: formValue.squadra1!,
    squadra2_id: formValue.squadra2!,
    puntisquadra1: formValue.puntisquadra1!,
    puntisquadra2: formValue.puntisquadra2!,
    meteSquadra1: formValue.meteSquadra1!,
    meteSquadra2: formValue.meteSquadra2!,
    girone_id: (formValue.girone_id!),
    
  };

  this.Partitaservice.addPartita(partita).subscribe(
      resp => {
        // console.log(resp);
        window.alert("Partita aggiunta");
        this.error = undefined;
        this.router.navigate(['/partite'])
      },
      err  => {
        console.log(this.PartiteRegisterFormGroup.value);
        console.log(err.error);
        window.alert("Errore");
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

    this.championshipService.findAllbySeason(id).subscribe(data => {
      //this.championships = data;
      this.championships = data;
                console.log('All Championships:', this.championships);

    });

  }


  isActiveSeason(id: number): boolean {
    return this.activeSeasonId === id; 
  }

  selectChampionship(id: number): void {
    this.activeButtonChampionshipId = id;

    this.classificaService.findAllbyChampionship(id).subscribe(data => {
      this.classificas = data;
     

    });

 }

 isActiveChampionship(id: number): boolean {
   
   return this.activeButtonChampionshipId === id;
   
 }

}


