import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Championship } from 'src/app/Interfaces/championship';
import { Classifica } from 'src/app/Interfaces/classifica';
import { Partite } from 'src/app/Interfaces/partite';
import { Season } from 'src/app/Interfaces/season';
import { Squadre } from 'src/app/Interfaces/squadre';
import { AuthService } from 'src/app/Services/auth.service';
import { ChampionshipService } from 'src/app/Services/championship.service';
import { ClassificaService } from 'src/app/Services/classifica.service';
import { PartiteService } from 'src/app/Services/partite.service';
import { SeasonService } from 'src/app/Services/season.service';
import { SquadraServiceService } from 'src/app/Services/squadra-service.service';


@Component({
  selector: 'app-partite',
  templateUrl: './partite.page.html',
  styleUrls: ['./partite.page.scss']
})
export class PartitePage implements OnInit {

  squadreforName: Squadre | undefined;
  activeDate:any;
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

  @ViewChild('f') form!: NgForm;
  // squadre: Squadre[];
  currentId = 0;
  partite: Partite[] = [];
  partite_2: Partite[] = [];
  partite_3: Date [] = [];
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

  partitaData:any ={
    id: '',
    date: '',
    squadra1: '',
    squadra2: '',
    puntisquadra1: '',
    puntisquadra2: '',
    meteSquadra1: '',
    meteSquadra2: '',
    girone: '',
   

  }

  hideForResponsive = false;
  hideForResponsivePhone = false;
//   squadra:any = {
//     nome: '',

    // squadra = JSON.stringify(this.squadre);
// };
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

  // dataSource2 = this.squadre ;
  // dataSource2 = this.squadre ;
  
  PartiteRegisterFormGroup = this._form.group({
    date: ['', Validators.required],
    squadra1: ['', Validators.required],
    squadra2: ['', Validators.required],
    puntisquadra1: ['', Validators.required],
    puntisquadra2: ['', Validators.required],
    meteSquadra1: ['', Validators.required],
    meteSquadra2: ['', Validators.required],
    girone: ['', Validators.required],
  
    });

    groupedPartite: { [key: string]: any[] } = {};

  constructor(private seasonService: SeasonService, private championshipService: ChampionshipService,private classificaService: ClassificaService,private partiteService: PartiteService, private SquadreServiceservice: SquadraServiceService, private _form: FormBuilder, private router: Router, private authService: AuthService, private responsive: BreakpointObserver) { }

  ngOnInit()  {

    this.classificaService.findAll().subscribe((classifiche: Classifica[]) => {
      this.classifiche = classifiche; // Set the classifiche data
      this.groupMatchesByClassifica(); // Now call the method after the data is fetched
    });

    this.seasonService.findAll().subscribe(data => {
      this.seasons = data;
    });

    this.partiteService.findAll().subscribe(data => {
      const uniqueDates = Array.from(
        new Set(data.map(partita => partita.date))
      ).map(date => new Date(date));  // Convert each unique date to a Date object
    
      this.partite_3 = uniqueDates;  // Now partite_3 is of type Date[]
    });
    
    this.modifybox = false;
    this.SquadreServiceservice.findAll().subscribe(data => {
      this.squadre = data;
     
        // this.dataSource2 = this.squadre ;
      
      // let roles: any[] = JSON.parse(localStorage.getItem('roles')!);
      // for (let role in roles) {
      //   console.log(roles[role].roleName);
        
      // }

      console.log("this admin",this.isAdmin() );
        

      // }

      
    });

    
   
    this.partiteService.findAll().subscribe(data => {
      this.partite = data;

      this.dataPartite.splice(0,this.dataPartite.length);
      this.dataPartite1.splice(0,this.dataPartite.length);
      this.dataPartite2.splice(0,this.dataPartite.length);
      this.dataPartite3.splice(0,this.dataPartite.length);
      this.dataPartite4.splice(0,this.dataPartite.length);
      this.dataPartite5.splice(0,this.dataPartite.length);
      this.dataPartite6.splice(0,this.dataPartite.length);

      this.partite.forEach(element => {
        let date1 =  new Date(element.date).toISOString();
        let newDate1 = date1.slice(0,10);
        if(newDate1 ==  this.newDate) {
          this.dataPartite.push(element)
        }
      });

      this.dataPartite.forEach(element => {
        let girone1 = 1;
        // if(girone1 ==  element.girone) {
        //   this.dataPartite1.push(element)
        // }
      });


      this.dataPartite.forEach(element => {
        let girone2 = 2;
        // if(girone2 ==  element.girone) {
        //   this.dataPartite2.push(element)
        // }
      });

      this.dataPartite.forEach(element => {
        let girone3 = 3;
        // if(girone3 ==  element.girone) {
        //   this.dataPartite3.push(element)
        // }
      });

      this.dataPartite.forEach(element => {
        let girone4 = 4;
        // if(girone4 ==  element.girone) {
        //   this.dataPartite4.push(element)
        // }
      });

      this.dataPartite.forEach(element => {
        let girone5 = 5;
        // if(girone5 ==  element.girone) {
        //   this.dataPartite5.push(element)
        // }
      });

      this.dataPartite.forEach(element => {
        let girone6 = 6;
        // if(girone6 ==  element.girone) {
        //   this.dataPartite6.push(element)
        // }
      });

        this.dataSource1 = new MatTableDataSource(this.dataPartite1) ;
        this.dataSource2 = new MatTableDataSource(this.dataPartite2) ;
        this.dataSource3 = new MatTableDataSource(this.dataPartite3) ;
        this.dataSource4 = new MatTableDataSource(this.dataPartite4) ;
        this.dataSource5 = new MatTableDataSource(this.dataPartite5) ;
        this.dataSource6 = new MatTableDataSource(this.dataPartite6) ;

    });


    this.responsive.observe([
      Breakpoints.TabletPortrait,
      Breakpoints.TabletLandscape,
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait])
      .subscribe(result => {
  
        this.hideForResponsive = false;
        this.hideForResponsivePhone = false;
    
        const breakpoints = result.breakpoints;
    
        if (result.matches) {
         
        }

        if (breakpoints[Breakpoints.HandsetPortrait]) {
          this.hideForResponsivePhone = true;
          this.hideForResponsive = true;
          this.displayedColumns = [ 'squadra1.nome', 'puntisquadra1', 'seperator','puntisquadra2', 'squadra2.nome',  'modifica', 'cancellare' ];
        }
        
        // else if (breakpoints[Breakpoints.HandsetLandscape]) {
        //   this.hideForResponsivePhone = true;
        //   this.hideForResponsive = true;
        //   this.displayedColumns = [ 'img1', 'squadra1.nome', 'puntisquadra1', 'seperator', 'puntisquadra2',  'squadra2.nome', 'img2', 'modifica', 'cancellare' ];
        // }
        // else if (breakpoints[Breakpoints.TabletLandscape]) {
        //   this.hideForResponsive = false;
        //   this.hideForResponsivePhone = false;
        //   this.displayedColumns = [ 'img1', 'squadra1.nome', 'puntisquadra1','metesquadra1', 'seperator', 'puntisquadra2', 'metesquadra2', 'squadra2.nome', 'img2', 'modifica', 'cancellare' ];
          
        // }
    
      });
      


  }

  // modifyPartita(partita:Partite) {
  
  //   this.partiteService.modifyPartita(partita.id, partita)
  //   .subscribe(data => console.log(data));

  // }

  modifyPartita(id:number) {
   this.modifybox = true;
   this.currentId = id;

   this.partiteService.findById(this.currentId).subscribe(data => 
    this.partitaData = data
    );


  }



  modify() {

    this.partiteService.modifyPartita(this.currentId, this.form.value)
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

  this.partiteService.cancellaPartita(this.currentId)
  .subscribe(
    data => {
      console.log('deleted response', data);
  // .subscribe(
    // resp => {
    //   console.log(resp)
      // this.ngOnInit()
// }
// )

  window.alert("Cancellato")
  this.areYouSure = false;
  this.ngOnInit()
})

}

// let roles: any[] = JSON.parse(localStorage.getItem('roles')!);
// for (let role in roles) {
//   console.log(roles[role].roleName);

isAdmin() {
  
  let isAdmin = null;
  let roles: any[] = this.authService.getRoles();
  for (let role in roles) {
    if (((roles[role].roleName)) === 'ROLE_USER'){
      isAdmin = 'hidden-row';
      
      
    }
    // else {
    //   isAdmin  = 'hidden-row'
    // }
    
  }
  return isAdmin;
  
}

// showColumn(): string {
//   return this.someService.hasAccess() ? null : 'hidden-row';
// }

close() {
  this.modifybox = false;
  this.areYouSure = false;

}

getPath(name: String): String {
  return "../../../assets/" + name + ".jpg";
  
  }

  


  // girone(date: string) {

   
  //   let convert = new Date(date).toISOString();
  // let convertedDate = convert.slice(0,10);
  // this.activeButton = convert.slice(0, 10);
 
    
  //   this.partiteService.findAll().subscribe(data => {
  //     this.partite = data;

  //     this.dataPartite.splice(0,this.dataPartite.length);
     
  //     this.partite.forEach(element => {
        
  //       let date1 =  new Date(element.date).toISOString();
  //       let newDate1 = date1.slice(0,10);
  //       if(newDate1 == convertedDate) {
        
  //         this.dataPartite.push(element)
       
  
  //       }
  //     });

  //     this.dataPartite1.splice(0,this.dataPartite.length);
  //     this.dataPartite2.splice(0,this.dataPartite.length);
  //     this.dataPartite3.splice(0,this.dataPartite.length);
  //     this.dataPartite4.splice(0,this.dataPartite.length);
  //     this.dataPartite5.splice(0,this.dataPartite.length);
  //     this.dataPartite6.splice(0,this.dataPartite.length);

  //       this.dataPartite.forEach(element => {
  //         let girone1 = 1;
  //         if(girone1 ==  element.girone) {
  //           this.dataPartite1.push(element)
  //         }
  //       });
  
  
  //       this.dataPartite.forEach(element => {
  //         let girone2 = 2;
  //         if(girone2 ==  element.girone) {
  //           this.dataPartite2.push(element)
  //         }
  //       });
  
  //       this.dataPartite.forEach(element => {
  //         let girone3 = 3;
  //         if(girone3 ==  element.girone) {
  //           this.dataPartite3.push(element)
  //         }
  //       });
  
  //       this.dataPartite.forEach(element => {
  //         let girone4 = 4;
  //         if(girone4 ==  element.girone) {
  //           this.dataPartite4.push(element)
  //         }
  //       });
  
  //       this.dataPartite.forEach(element => {
  //         let girone5 = 5;
  //         if(girone5 ==  element.girone) {
  //           this.dataPartite5.push(element)
  //         }
  //       });
  
  //       this.dataPartite.forEach(element => {
  //         let girone6 = 6;
  //         if(girone6 ==  element.girone) {
  //           this.dataPartite6.push(element)
  //         }
  //       });
     
  //     this.dataSource1 = new MatTableDataSource(this.dataPartite1) ;
  //       this.dataSource2 = new MatTableDataSource(this.dataPartite2) ;
  //       this.dataSource3 = new MatTableDataSource(this.dataPartite3) ;
  //       this.dataSource4 = new MatTableDataSource(this.dataPartite4) ;
  //       this.dataSource5 = new MatTableDataSource(this.dataPartite5) ;
  //       this.dataSource6 = new MatTableDataSource(this.dataPartite6) ;
 

  //   });

   

  // }

  isActive(date: string): boolean {
    const convert = new Date(date).toISOString();
    const convertedDate = convert.slice(0, 10);
  
    console.log('Converted Date:', convertedDate);
    console.log('Active Button:', this.activeButton);
  
    return this.activeButton === convertedDate;
  
  }
  scrollleft() {

    const slidesContainer = document.getElementById("slides-container");
const slide = document.querySelector(".slide");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");

if (slide != null && slidesContainer != null) {
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft -= slideWidth;
}

}

  

  scrollright() {

    const slidesContainer = document.getElementById("slides-container");
const slide = document.querySelector(".slide");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");

if (slide != null && slidesContainer != null) {
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft += slideWidth;

    
  }

}



selectDate(date: Date): void {
  this.activeDate = date; 
  console.log('currentyear again:', this.currentYear);
  this.partiteService.findAll().subscribe(data => {
    console.log('partite data:', data);
    
    // Filter the 'data' to only include partite with the same date
    // this.partite_2 = data.filter(partita => {
    //   return new Date(partita.date).toDateString() === new Date(this.activeDate).toDateString();
    // });
    this.partite_2 = data.filter(partita => {
      const partitaDate = new Date(partita.date);
      const isSameDate = partitaDate.toDateString() === new Date(this.activeDate).toDateString();
      const isSameYear = partitaDate.getFullYear() === this.currentYear;
    
      return isSameDate && isSameYear;
    });
    
    console.log('Filtered partite for current year:', this.partite_2);
  });


  let seasonYear = this.activeDate.getFullYear().toString();; 
  let champSeasonId: number | undefined;


  if(this.seasons) {
  for (let season of this.seasons){

    if (season.year === seasonYear.toString()) {
      champSeasonId = season.id;
    }
  }

  }

  if (champSeasonId === undefined) {
    throw new Error(`No season found for year ${seasonYear}`);
  }

  this.championshipService.findAllbySeason(champSeasonId).subscribe(data => {
    this.championships = data;
    console.log('Helllpoooooooo  Championships:', this.championships);
    console.log('WELLLLLLLL  seaosnns:', this.seasons);
    console.log('YEUPPPP  season year:', seasonYear);

});
}

isActiveDate(date: Date): boolean {
  return this.activeDate === date;
}


groupMatchesByClassifica() {
  this.groupedPartite = {};

  // this.classificaService.findAllbyChampionship(2).subscribe(data => {
  //   this.classifiche = data;
    
//});


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

selectChampionship(id: number): void {
  this.activeChampionshipId = id;
 this.championshipService.findById(id).subscribe(data => {
  this.championship = data;
  console.log('all Championship data:', data);
  console.log('Championship season id:', this.championship?.season.id);
  console.log('Championship id:', this.championship?.id);
  console.log('season id:', this.seasonid);
  // need to pass in the same season id 
 // this.router.navigate([this.championship?.id], { relativeTo: this.route });

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


selectSeason(id: number): void {
  sessionStorage.clear();
  this.activeSeasonId = id;
 this.seasonService.findById(id).subscribe(data => {
  this.season = data;
  console.log('Season data:', data);
  //this.router.navigate(['classifica', this.season?.id]);
  if (this.season?.year) {
    this.currentYear = parseInt(this.season.year, 10);
  }
  console.log('Current Year:', this.currentYear);

  if (this.season?.id != null) {
    this.router.navigate(['calendario', this.season.id]);
    
  } else {
    console.error('Errore: season.id è undefined');
  }
  });
 

}

isActiveSeason(id: number): boolean {
  return this.activeSeasonId === id;
}

}
