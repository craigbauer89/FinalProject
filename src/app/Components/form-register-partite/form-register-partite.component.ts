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
import { Channel } from 'src/app/Interfaces/channel';
import { ChannelService } from 'src/app/Services/channel.service';
import { stadiumService } from 'src/app/Services/stadium.service';
import { Stadium } from 'src/app/Interfaces/stadium';


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
  channels: Channel[] = [];
   stadium: Stadium[] = [];
  

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
    tickets: this.form.control<string>('', { validators: [Validators.required], nonNullable: true }),
    time: this.form.control<string>('', { validators: [Validators.required], nonNullable: true }),
    classifica_id: this.form.control<number>(0, { validators: [Validators.required], nonNullable: true }),
    channel: [null as Channel | null, Validators.required],
    played: this.form.control<boolean>(false, { validators: [Validators.required], nonNullable: true }),
    stadium: [null as Stadium | null, Validators.required],
  });

  constructor(private stadiumService: stadiumService,private channelService: ChannelService, private classificaService: ClassificaService,private championshipService: ChampionshipService,private seasonService: SeasonService,private authService: AuthService,private route: ActivatedRoute,private Partitaservice: PartiteService, private SquadreServiceservice: SquadraServiceService,private router: Router,
    private form: FormBuilder, public userService: UserService) { 

      // this.squadra = new Squadre();
    }

    test() {

    }

    ngOnInit()  {

      this.stadiumService.findAll().subscribe(data => {
        this.stadium = data;
     
  
      });

      this.seasonService.findAll().subscribe(data => {
        this.seasons = data;
       // this.dataSourceSeason = this.seasons ;
      });

      this.channelService.findAll().subscribe(data => {
        this.channels = data;
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

   var formDate = new Date();
      const today = new Date();
      if (formValue.date !== undefined) {
        formDate = new Date(formValue.date);
      }
      
  
  const partita: Partite = {
    date: formValue.date ?? new Date(),  // fallback to avoid undefined
    squadra1_id: formValue.squadra1!,
    squadra2_id: formValue.squadra2!,
    puntisquadra1: formValue.puntisquadra1!,
    puntisquadra2: formValue.puntisquadra2!,
    meteSquadra1: formValue.meteSquadra1!,
    meteSquadra2: formValue.meteSquadra2!,
    classifica_id: (formValue.classifica_id!),
    tickets: formValue.tickets!,
    time: formValue.time!,
    channel: formValue.channel!,
    played: formDate > today ? false : true,
    stadium: formValue.stadium!,
    
  };
  console.log("Partita issssss",partita);
  this.Partitaservice.addPartita(partita).subscribe(

      resp => {
       
        // console.log(resp);
        window.alert("Partita aggiunta");
        this.error = undefined;
       // this.router.navigate(['/partite'])
      },
      err => {
        console.error("Errore backend:", err);
      
        // Estrae il messaggio dal backend (può essere in err.error.message)
        const errorMessage = err.error?.message || err.error || "Errore sconosciuto";
      
        // Mostra l’errore sullo schermo
        window.alert(errorMessage);
      
        // Salva l’errore in una variabile per mostrarlo anche nel template
        this.error = errorMessage;
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


