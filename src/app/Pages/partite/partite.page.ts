import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Partite } from 'src/app/Interfaces/partite';
import { Squadre } from 'src/app/Interfaces/squadre';
import { AuthService } from 'src/app/Services/auth.service';
import { PartiteService } from 'src/app/Services/partite.service';
import { SquadraServiceService } from 'src/app/Services/squadra-service.service';


@Component({
  selector: 'app-partite',
  templateUrl: './partite.page.html',
  styleUrls: ['./partite.page.scss']
})
export class PartitePage implements OnInit {

  isBold: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false,false];


  @ViewChild('f') form!: NgForm;
  // squadre: Squadre[];
  currentId = 0;
  partite: Partite[] = [];
  dataPartite: Partite[] = [];
  dataPartite1: Partite[] = [];
  dataPartite6: Partite[] = [];
  dataPartite2: Partite[] = [];
  dataPartite3: Partite[] = [];
  dataPartite4: Partite[] = [];
  dataPartite5: Partite[] = [];

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


  constructor(private partiteService: PartiteService, private SquadreServiceservice: SquadraServiceService, private _form: FormBuilder, private router: Router, private authService: AuthService, private responsive: BreakpointObserver) { }

  ngOnInit()  {

    this.isBold[0] = true;
    this.modifybox = false;
    this.SquadreServiceservice.findAll().subscribe(data => {
      this.squadre = data;

        // this.dataSource2 = this.squadre ;

      // let roles: any[] = JSON.parse(localStorage.getItem('roles')!);
      // for (let role in roles) {
      //   console.log(roles[role].roleName);

      // }

      console.log(this.isAdmin() );


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
        if(girone1 ==  element.girone) {
          this.dataPartite1.push(element)
        }
      });


      this.dataPartite.forEach(element => {
        let girone2 = 2;
        if(girone2 ==  element.girone) {
          this.dataPartite2.push(element)
        }
      });

      this.dataPartite.forEach(element => {
        let girone3 = 3;
        if(girone3 ==  element.girone) {
          this.dataPartite3.push(element)
        }
      });

      this.dataPartite.forEach(element => {
        let girone4 = 4;
        if(girone4 ==  element.girone) {
          this.dataPartite4.push(element)
        }
      });

      this.dataPartite.forEach(element => {
        let girone5 = 5;
        if(girone5 ==  element.girone) {
          this.dataPartite5.push(element)
        }
      });

      this.dataPartite.forEach(element => {
        let girone6 = 6;
        if(girone6 ==  element.girone) {
          this.dataPartite6.push(element)
        }
      });



        // this.dataSource = new MatTableDataSource(this.dataPartite) ;
        this.dataSource1 = new MatTableDataSource(this.dataPartite1) ;
        this.dataSource2 = new MatTableDataSource(this.dataPartite2) ;
        this.dataSource3 = new MatTableDataSource(this.dataPartite3) ;
        this.dataSource4 = new MatTableDataSource(this.dataPartite4) ;
        this.dataSource5 = new MatTableDataSource(this.dataPartite5) ;
        this.dataSource6 = new MatTableDataSource(this.dataPartite6) ;


      // }
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

    // this.ngOnInit();

    let squadra1:Squadre;
    let squadra2:Squadre;
    let modifyedPartita:Partite;
    this.partite.forEach(element => {
      if(element.id == this.currentId) {
        modifyedPartita= element;
         squadra1 = element.squadra1;
         squadra2 = element.squadra2;

         squadra1.puntiFatti -= modifyedPartita.puntisquadra1;
         squadra1.puntiSubiti -= modifyedPartita.puntisquadra2;
    squadra1.meteFatti-= modifyedPartita.meteSquadra1;
    squadra1.meteSubiti -= modifyedPartita.meteSquadra2;
    let differenza = modifyedPartita.puntisquadra1-modifyedPartita.puntisquadra2;
    squadra1.differenza -= differenza;
    squadra1.giocate -= 1;
    if (differenza > 0) {
      squadra1.vittorie -= 1;
      squadra1.punti -= 4;
    }
    else if(differenza < 0)  {
      squadra1.sconfitte -= 1;

    }
    else {
      squadra1.pareggi -= 1;
      squadra1.punti -= 2;
    }

    squadra1.puntiFatti += this.form.value.puntisquadra1;
    squadra1.puntiSubiti += this.form.value.puntisquadra2;
    squadra1.meteFatti += this.form.value.meteSquadra1;
    squadra1.meteSubiti += this.form.value.meteSquadra2;
    let differenza1a = squadra1.puntiFatti-squadra1.puntiSubiti;
    squadra1.differenza += differenza1a;
    squadra1.giocate += 1;
    if (differenza1a > 0) {
      squadra1.vittorie += 1;
      squadra1.punti += 4;
    }
    else if(differenza1a < 0)  {
      squadra1.sconfitte += 1;

    }
    else {
      squadra1.pareggi += 1;
      squadra1.punti += 2;
    }


    this.SquadreServiceservice.modifySquadra(squadra1.id, squadra1)
    .subscribe(data => console.log(data));


    squadra2.puntiFatti -= modifyedPartita.puntisquadra2;
    squadra2.puntiSubiti -= modifyedPartita.puntisquadra1;
  squadra2.meteFatti-= modifyedPartita.meteSquadra2;
  squadra2.meteSubiti -= modifyedPartita.meteSquadra1;
  let differenza2 = modifyedPartita.puntisquadra2-modifyedPartita.puntisquadra1;
  squadra2.differenza -= differenza2;
  squadra2.giocate -= 1;
  if (differenza2 > 0) {
  squadra2.vittorie -= 1;
  squadra2.punti -= 4;
  }
  else if(differenza2 < 0)  {
  squadra2.sconfitte -= 1;

  }
  else {
  squadra2.pareggi -= 1;
  squadra2.punti -= 2;
  }

  squadra2.puntiFatti += this.form.value.puntisquadra2;
    squadra2.puntiSubiti += this.form.value.puntisquadra1;
    squadra2.meteFatti += this.form.value.meteSquadra2;
    squadra2.meteSubiti += this.form.value.meteSquadra1;
    let differenza2a = squadra2.puntiFatti-squadra2.puntiSubiti;
    squadra2.differenza += differenza2a;
    squadra2.giocate += 1;
    if (differenza2a > 0) {
      squadra2.vittorie += 1;
      squadra2.punti += 4;
    }
    else if(differenza2a < 0)  {
      squadra2.sconfitte += 1;
    }
    else {
      squadra2.pareggi += 1;
      squadra2.punti += 2;
    }

  this.SquadreServiceservice.modifySquadra(squadra2.id, squadra2)
  .subscribe(data => console.log(data));

      }}
      );







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

  let squadra1:Squadre;
  let squadra2:Squadre;
  let deletedPartita:Partite;
  this.partite.forEach(element => {
    if(element.id == this.currentId) {
       deletedPartita= element;
       squadra1 = element.squadra1;
       squadra2 = element.squadra2;

       squadra1.puntiFatti -= deletedPartita.puntisquadra1;
       squadra1.puntiSubiti -= deletedPartita.puntisquadra2;
  squadra1.meteFatti-= deletedPartita.meteSquadra1;
  squadra1.meteSubiti -= deletedPartita.meteSquadra2;
  let differenza = deletedPartita.puntisquadra1-deletedPartita.puntisquadra2;
  squadra1.differenza -= differenza;
  squadra1.giocate -= 1;
  if (differenza > 0) {
    squadra1.vittorie -= 1;
    squadra1.punti -= 4;
  }
  else if(differenza < 0)  {
    squadra1.sconfitte -= 1;

  }
  else {
    squadra1.pareggi -= 1;
    squadra1.punti -= 2;
  }

  this.SquadreServiceservice.modifySquadra(squadra1.id, squadra1)
  .subscribe(data => console.log(data));


  squadra2.puntiFatti -= deletedPartita.puntisquadra2;
  squadra2.puntiSubiti -= deletedPartita.puntisquadra1;
squadra2.meteFatti-= deletedPartita.meteSquadra2;
squadra2.meteSubiti -= deletedPartita.meteSquadra1;
let differenza2 = deletedPartita.puntisquadra2-deletedPartita.puntisquadra1;
squadra2.differenza -= differenza2;
squadra2.giocate -= 1;
if (differenza2 > 0) {
squadra2.vittorie -= 1;
squadra2.punti -= 4;
}
else if(differenza2 < 0)  {
squadra2.sconfitte -= 1;

}
else {
squadra2.pareggi -= 1;
squadra2.punti -= 2;
}

this.SquadreServiceservice.modifySquadra(squadra2.id, squadra2)
.subscribe(data => console.log(data));

    }}
    );







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


  girone(date: string) {



    let convert = new Date(date).toISOString();
  let convertedDate = convert.slice(0,10);



    this.partiteService.findAll().subscribe(data => {
      this.partite = data;

      this.dataPartite.splice(0,this.dataPartite.length);


      this.partite.forEach(element => {

        let date1 =  new Date(element.date).toISOString();
        let newDate1 = date1.slice(0,10);
        // console.log(newDate1)
        // console.log(convertedDate)
        if(newDate1 == convertedDate) {

          this.dataPartite.push(element)


        }
      });

      this.dataPartite1.splice(0,this.dataPartite.length);
      this.dataPartite2.splice(0,this.dataPartite.length);
      this.dataPartite3.splice(0,this.dataPartite.length);
      this.dataPartite4.splice(0,this.dataPartite.length);
      this.dataPartite5.splice(0,this.dataPartite.length);
      this.dataPartite6.splice(0,this.dataPartite.length);

        this.dataPartite.forEach(element => {
          let girone1 = 1;
          if(girone1 ==  element.girone) {
            this.dataPartite1.push(element)
          }
        });


        this.dataPartite.forEach(element => {
          let girone2 = 2;
          if(girone2 ==  element.girone) {
            this.dataPartite2.push(element)
          }
        });

        this.dataPartite.forEach(element => {
          let girone3 = 3;
          if(girone3 ==  element.girone) {
            this.dataPartite3.push(element)
          }
        });

        this.dataPartite.forEach(element => {
          let girone4 = 4;
          if(girone4 ==  element.girone) {
            this.dataPartite4.push(element)
          }
        });

        this.dataPartite.forEach(element => {
          let girone5 = 5;
          if(girone5 ==  element.girone) {
            this.dataPartite5.push(element)
          }
        });

        this.dataPartite.forEach(element => {
          let girone6 = 6;
          if(girone6 ==  element.girone) {
            this.dataPartite6.push(element)
          }
        });


      // this.dataSource = new MatTableDataSource(this.dataPartite) ;
      this.dataSource1 = new MatTableDataSource(this.dataPartite1) ;
        this.dataSource2 = new MatTableDataSource(this.dataPartite2) ;
        this.dataSource3 = new MatTableDataSource(this.dataPartite3) ;
        this.dataSource4 = new MatTableDataSource(this.dataPartite4) ;
        this.dataSource5 = new MatTableDataSource(this.dataPartite5) ;
        this.dataSource6 = new MatTableDataSource(this.dataPartite6) ;

      // console.log(JSON.stringify(data));
      // console.log(this.squadre[1]);
      // for(let cat in this.squadre) {
        // console.log(this.squadre);
        // this.dataSource = new MatTableDataSource(this.dataPartite) ;
        // this.dataSource.sort = this.sort;
        // console.log(this.dataSource);
      // }
    });



  }

  active0() {
    this.isBold = [false,false,false,false,false,false,false,false,false,false,false,false,false];
    this.isBold[0] = true;
  }
  active1() {
    this.isBold = [false,false,false,false,false,false,false,false,false,false,false,false,false];
    this.isBold[1] = true;
  }
  active2() {
    this.isBold = [false,false,false,false,false,false,false,false,false,false,false,false,false];
    this.isBold[2] = true;
  }
  active3() {
    this.isBold = [false,false,false,false,false,false,false,false,false,false,false,false,false];
    this.isBold[3] = true;
  }
  active4() {
    this.isBold = [false,false,false,false,false,false,false,false,false,false,false,false,false];
    this.isBold[4] = true;
  }
  active5() {
    this.isBold = [false,false,false,false,false,false,false,false,false,false,false,false,false];
    this.isBold[5] = true;
  }
  active6() {
    this.isBold = [false,false,false,false,false,false,false,false,false,false,false,false,false];
    this.isBold[6] = true;
  }
  active7() {
    this.isBold = [false,false,false,false,false,false,false,false,false,false,false,false,false];
    this.isBold[7] = true;
  }
  active8() {
    this.isBold = [false,false,false,false,false,false,false,false,false,false,false,false,false];
    this.isBold[8] = true;
  }
  active9() {
    this.isBold = [true,false,false,false,false,false,false,false,false,false,false,false,false];
    this.isBold[9] = true;
  }
  active10() {
    this.isBold = [false,false,false,false,false,false,false,false,false,false,false,false,false];
    this.isBold[10] = true;
  }
  active11() {
    this.isBold = [false,false,false,false,false,false,false,false,false,false,false,false,false];
    this.isBold[11] = true;
  }
  active12() {
    this.isBold = [false,false,false,false,false,false,false,false,false,false,false,false,false];
    this.isBold[12] = true;
  }
  active13() {
    this.isBold = [false,false,false,false,false,false,false,false,false,false,false,false,false];
    this.isBold[13] = true;
  }
  active14() {
    this.isBold = [false,false,false,false,false,false,false,false,false,false,false,false,false];
    this.isBold[14] = true;
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


}
