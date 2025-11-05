import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Championship } from 'src/app/Interfaces/championship';
import { Classifica } from 'src/app/Interfaces/classifica';
import { Partite } from 'src/app/Interfaces/partite';
import { Season } from 'src/app/Interfaces/season';
import { Squadre } from 'src/app/Interfaces/squadre';
import { AuthService } from 'src/app/Services/auth.service';
import { ChampionshipService } from 'src/app/Services/championship.service';
import { ChannelService } from 'src/app/Services/channel.service';
import { ClassificaService } from 'src/app/Services/classifica.service';
import { PartiteService } from 'src/app/Services/partite.service';
import { SeasonService } from 'src/app/Services/season.service';
import { SquadraServiceService } from 'src/app/Services/squadra-service.service';
import { Channel } from 'src/app/Interfaces/channel';

@Component({
  selector: 'app-partite-details2',
  templateUrl: './partite-details2.component.html',
  styleUrls: ['./partite-details2.component.scss']
})
export class PartiteDetails2Component implements OnInit {

  activeDate:any;
  squadreforName: Squadre | undefined;
  partita: Partite | undefined;
  classifiche: Classifica[]| undefined;
  championships: Championship[]| undefined;
  seasons: Season[]| undefined;
  currentYear = new Date().getFullYear(); 
  partitaYear = new Date().getFullYear(); 
  activeChampionshipId:any;
  seasonid!: number;
  championship!: Championship;
  season: Season | undefined;
  activeSeasonId:any;
  partitaGet: Partite | undefined;
  partite_2: Partite[] = [];
  partite: Partite[] = [];
  partite_3: Date [] = [];
  groupedPartite: { [key: string]: any[] } = {};
  @ViewChild('f') form!: NgForm;
  currentId = 0;
  
  dataPartite: Partite[] = [];
  dataPartite1: Partite[] = [];
  dataPartite6: Partite[] = [];
  dataPartite2: Partite[] = [];
  dataPartite3: Partite[] = [];
  dataPartite4: Partite[] = [];
  dataPartite5: Partite[] = [];

  activeButton: string | null = null;
  convert = new Date(2022, 9, 10).toISOString();
  newDate = this.convert.slice(0,10);
  areYouSure = false;
  modifybox = false;
  error = undefined;
  channels: Channel[] = [];

  
  partitaData:any =
  {
    id: '',
    date: '',
    squadra1: '',
    squadra2: '',
    puntisquadra1: '',
    puntisquadra2: '',
    meteSquadra1: '',
    meteSquadra2: '',
    classifica_id: '',
  }

  hideForResponsive = false;
  hideForResponsivePhone = false;
  displayedColumns: string[] = [ 'img1', 'squadra1.nome', 'puntisquadra1','metesquadra1', 'seperator', 'puntisquadra2', 'metesquadra2', 'squadra2.nome', 'img2', 'modifica', 'cancellare' ];
  dataSource = new MatTableDataSource(this.dataPartite) ;
  dataSource1 = new MatTableDataSource(this.dataPartite2) ;
  dataSource2 = new MatTableDataSource(this.dataPartite2) ;
  dataSource3 = new MatTableDataSource(this.dataPartite3) ;
  dataSource4 = new MatTableDataSource(this.dataPartite4) ;
  dataSource5 = new MatTableDataSource(this.dataPartite5) ;
  dataSource6 = new MatTableDataSource(this.dataPartite6) ;

  dataSource_new = new MatTableDataSource(this.partite_2) ;
  
  squadre: Squadre[] = [];

  squadrelist: Squadre[] = [];
  
  PartiteRegisterFormGroup = this._form.group({
    date: ['', Validators.required],
    squadra1: ['', Validators.required],
    squadra2: ['', Validators.required],
    puntisquadra1: ['', Validators.required],
    puntisquadra2: ['', Validators.required],
    meteSquadra1: ['', Validators.required],
    meteSquadra2: ['', Validators.required],
    classifica_id: ['', Validators.required],
    tickets: ['', Validators.required],
    channel: ['', Validators.required],
   // played: ['', Validators.required],
  });
  

  constructor(private channelService: ChannelService,private seasonService: SeasonService, private championshipService: ChampionshipService,private classificaService: ClassificaService,private partiteService: PartiteService, private SquadreServiceservice: SquadraServiceService, private _form: FormBuilder, private router: Router, private authService: AuthService, private responsive: BreakpointObserver, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.channelService.findAll().subscribe(data => {
      this.channels = data;
     // this.dataSourceSeason = this.seasons ;
    });


    this.SquadreServiceservice.findAll().subscribe(data => {
      this.squadrelist = data; });

    this.route.params.subscribe(params => {
      console.log('Params at :date route:', params);  // Should log { date: '2025-06-19' }
      this.activeDate = params['date'];
      console.log('dateeee:', this.activeDate);

      this.partiteService.findAll().subscribe(data => {
        const activeDateStr = new Date(this.activeDate).toDateString();
        
        this.partite_2 = data.filter(partita => {
        const partitaDate = new Date(partita.date);
        const isSameDate = partitaDate.toDateString() === activeDateStr;

        const isSameYear = partitaDate.getFullYear() === this.currentYear;
      
        return isSameDate && isSameYear;
        });
        console.log('partite 2 lads:', this.partite_2)
      });

      this.route.parent?.params.subscribe(parentParams => {
        this.seasonid = parseInt(parentParams['season'], 10);
        console.log('Season ID:', this.seasonid);

        this.seasonService.findById(this.seasonid).subscribe(data => {
          this.currentYear = parseInt(data.year, 10);
        });

        this.championshipService.findAllbySeason(this.seasonid).subscribe(data => {
          this.championships = data;
          console.log('Helllpoooooooo  Championships:', this.championships);
          if (this.championships.length > 0) {
            // Ordina per nome alfabeticamente
            const sorted = [...this.championships].sort((a, b) =>
              a.name.localeCompare(b.name)
            );
            const firstChampionship = sorted[0];
            console.log('Selected first (alphabetical) championship:', firstChampionship);
            const groupId = sessionStorage.getItem('lastGroup');
            if (groupId) {
              this.selectChampionship(parseInt(groupId, 10));
            }
            else {
              this.selectChampionship(this.championships[0].id);
          }
        }
        });
      });
    });
    console.log("SMELLL",this.activeChampionshipId)
  }

  modifyPartita(id:number) {
    this.modifybox = true;
    this.currentId = id;
    this.partiteService.findById(this.currentId).subscribe(data => 
    this.partitaData = data
    );
  }

  modify() {


    var formDate = new Date();
    const today = new Date();
    if (this.form.value.date !== undefined) {
      formDate = new Date(this.form.value.date);
    }
    

      console.log(this.currentId)
      console.log(this.form.value)
      this.partiteService.modifyPartita(this.currentId,{
        date: this.form.value.date,
        classifica_id: this.form.value.classifica_id,
        puntisquadra1: this.form.value.puntisquadra1,
        puntisquadra2: this.form.value.puntisquadra2,
        meteSquadra1: this.form.value.meteSquadra1,
        meteSquadra2: this.form.value.meteSquadra2,
        squadra1_id: this.form.value.squadra1.id,
        squadra2_id: this.form.value.squadra2.id,
        tickets: this.form.value.tickets,
        channel: this.form.value.channel,
        played: formDate > today ? false : true, // if date gets changes need to undo the changes!!

      })
      .subscribe(data => console.log(data));
      this.modifybox = false;
      window.alert("Partita Modifichato")
      this.partiteService.findAll().subscribe(data => {
        this.partitaData = data;
      });


   
  }

  cancella(id:number) {
  this.currentId = id;
  this.areYouSure = true;
  }


  cancellaPartita() {
    this.partiteService.cancellaPartita(this.currentId).subscribe(data => {console.log('deleted response', data);
    window.alert("Cancellato")
    this.areYouSure = false;
    this.ngOnInit()
    })
  }

  isAdmin() {
  let isAdmin = null;
  let roles: any[] = this.authService.getRoles();
  for (let role in roles) {
    if (((roles[role].roleName)) === 'ROLE_USER'){
      isAdmin = 'hidden-row';
    }
  }
  return isAdmin;
  }

  close() {
  this.modifybox = false;
  this.areYouSure = false;
  }

  getPath(name: String): String {
  return "../../../assets/" + name + ".jpg";
  }

  scrollleft3() {
      const slidesContainer = document.getElementById("slides-container3");
      const slide = document.querySelector(".slide3");
      const prevButton = document.getElementById("slide-arrow-prev3");
      const nextButton = document.getElementById("slide-arrow-next3");
      if (slide != null && slidesContainer != null) {
        const slideWidth = slide.clientWidth;
        slidesContainer.scrollLeft -= slideWidth;
      }
  }

  scrollright3() {
    const slidesContainer = document.getElementById("slides-container3");
    const slide = document.querySelector(".slide2");
    const prevButton = document.getElementById("slide-arrow-prev3");
    const nextButton = document.getElementById("slide-arrow-next3");
    if (slide != null && slidesContainer != null) {
      const slideWidth = slide.clientWidth;
      slidesContainer.scrollLeft += slideWidth;
    }
  }

  isActiveDate(date: Date): boolean {
    return this.activeDate === date;
  }

  selectChampionship(id: number): void {
    sessionStorage.setItem('lastGroup', id.toString());
    this.activeChampionshipId = id;
    this.championshipService.findById(id).subscribe(data => {
    this.championship = data;
    console.log('all Championship data:', data);
    console.log('Championship season id:', this.championship?.season.id);
    console.log('Championship id:', this.championship?.id);
    console.log('season id:', this.seasonid);
    });

    this.classificaService.findAllbyChampionship(id).subscribe(data => {
    this.classifiche = data;
    console.log('Get all classisificas for this championship:', this.classifiche);
    this.groupMatchesByClassifica();
  });


  }

  isActiveChampionship(id: number): boolean {
    return this.activeChampionshipId === id;
  }

  groupMatchesByClassifica() {
    this.groupedPartite = {};
    console.log('classifica fm', this.classifiche);
    console.log('partite 2?', this.partite_2);

    if (this.classifiche && this.classifiche.length > 0) {
      for (let partita of this.partite_2) {
        
        let classificaName = 'no classificas found';
        for (let classifica of this.classifiche) {
        
          const squadreList = classifica.squadre || [];

          for (let squadra of squadreList) {

            if (
              Number(squadra.id) === Number(partita.squadra1_id) ||
              Number(squadra.id) === Number(partita.squadra2_id)
            ) {
              console.log('MATCH FOUND:', squadra.id, '->', classifica.name);
              classificaName = classifica.name;
              break;
            }
          }
          if (classificaName !== 'no classificas found') break;
        }

        if (classificaName === 'no classificas found') {
          console.warn('No classifica found for partita:', partita);
          continue; // <-- skip this partita
        }

        if (!this.groupedPartite[classificaName]) {
          this.groupedPartite[classificaName] = [];
        }
        this.groupedPartite[classificaName].push(partita);
      }
    } else {
      console.error('Classifiche is not available or empty');
    }
    console.log('Grouped partite:', this.groupedPartite);
  }
}
