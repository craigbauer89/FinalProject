import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Partite } from 'src/app/Interfaces/partite';
import { Squadre } from 'src/app/Interfaces/squadre';
import { AuthService } from 'src/app/Services/auth.service';
import { PartiteService } from 'src/app/Services/partite.service';
import { SquadraServiceService } from 'src/app/Services/squadra-service.service';


@Component({
  templateUrl: './partite.page.html',
  styleUrls: ['./partite.page.scss']
})
export class PartitePage implements OnInit {

  @ViewChild('f') form!: NgForm;
  // squadre: Squadre[];
  currentId = 0;
  partite: Partite[] = [];
  
  areYouSure = false;
  modifybox = false;
  error = undefined;

  hideForResponsive = false;
  hideForResponsivePhone = false;
//   squadra:any = {
//     nome: '',

    // squadra = JSON.stringify(this.squadre);
// };
displayedColumns: string[] = ['date', 'img1', 'squadra1.nome', 'puntisquadra1','metesquadra1', 'puntisquadra2', 'metesquadra2', 'squadra2.nome', 'img2', 'modifica', 'cancellare' ];
  dataSource: Partite[] = [];
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
      
  
    });


  constructor(private partiteService: PartiteService, private SquadreServiceservice: SquadraServiceService, private _form: FormBuilder, private router: Router, private authService: AuthService, private responsive: BreakpointObserver) { }

  ngOnInit()  {
    
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
      // console.log(JSON.stringify(data));
      // console.log(this.squadre[1]);
      // for(let cat in this.squadre) {
        // console.log(this.squadre);
        this.dataSource = this.partite ;
        // console.log(this.dataSource);
        // console.log(this.dataSource[0]);
        // console.log(this.dataSource[0].squadra1.nome);
        // for(let i in this.dataSource)
        // console.log(this.dataSource[i].squadra1.nome);
        
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
    
        // if (result.matches) {
         
        // }

        if (breakpoints[Breakpoints.HandsetPortrait]) {
          this.hideForResponsivePhone = true;
          this.hideForResponsive = true;
          this.displayedColumns = ['date','img1', 'squadra1.nome', 'puntisquadra1','puntisquadra2', 'squadra2.nome', 'img2', 'modifica', 'cancellare' ];
        }
        
        else if (breakpoints[Breakpoints.HandsetLandscape]) {
          this.hideForResponsivePhone = false;
          this.hideForResponsive = true;
          this.displayedColumns = ['date', 'img1', 'squadra1.nome', 'puntisquadra1','metesquadra1', 'puntisquadra2', 'metesquadra2', 'squadra2.nome', 'img2', 'modifica', 'cancellare' ];
        }
        else if (breakpoints[Breakpoints.TabletLandscape]) {
          this.hideForResponsive = false;
          this.hideForResponsivePhone = false;
          this.displayedColumns = ['date', 'img1', 'squadra1.nome', 'puntisquadra1','metesquadra1', 'puntisquadra2', 'metesquadra2', 'squadra2.nome', 'img2', 'modifica', 'cancellare' ];
          
        }
    
      });
      


  }

  // modifyPartita(partita:Partite) {
  
  //   this.partiteService.modifyPartita(partita.id, partita)
  //   .subscribe(data => console.log(data));

  // }

  modifyPartita(id:number) {
   this.modifybox = true;
   this.currentId = id;

  }

  modify() {

    this.partiteService.modifyPartita(this.currentId, this.form.value)
    .subscribe(data => console.log(data));

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
      this.dataSource = data;

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

}
