import { BreakpointObserver,Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Jersey } from 'src/app/Interfaces/jersey';
import { Squadre } from 'src/app/Interfaces/squadre';
import { AuthService } from 'src/app/Services/auth.service';
import { JerseyService } from 'src/app/Services/jersey.service';
import { SquadraServiceService } from 'src/app/Services/squadra-service.service';
import { ErrorHandler } from '@angular/core';

@Component({
  templateUrl: './squadre-info.page.html',
  styleUrls: ['./squadre-info.page.scss']
})
export class SquadreInfoPage implements OnInit {

  latitude = 45.6478998820815;
  longitude = 9.351554226855578;
  searchText: any;
  @ViewChild('f') form!: NgForm;
  currentId = 0;
  areYouSure = false;
  modifybox = false;
  error = undefined;
  path = " ";
  cat =  "../../../assets/Velate.jpg";
  page: number = 1;
  count: number = 0;
  tableSize: number = 8;
  tableSizes: any = [3, 6, 9, 12];
  hideForResponsive = false;
  jersey: Jersey[] = [];

  squadraData:any ={
    id: '',
nome: '',
allenatore: '',
sito: '',
indirizzo: '',
latitude: '',
longitude: '',
punti: '',
vittorie: '',
pareggi: '',
sconfitte: '',
giocate: '',
meteFatti:'',
meteSubiti: '',
puntiSubiti: '',
puntiFatti: '',
differenza: '',
jersey: '',
  }

  client:any = {
    ragioneSociale: '',
    telefono: '',
    emailAziendale: '',
    nomeContatto: '',
    
};



cat1 = "https://www.w3schools.com";

  squadre: Squadre[] = [];

  SquadreRegisterFormGroup = this._form.group({
    nome: ['', Validators.required],
    allenatore: ['', Validators.required],
    sito: ['', Validators.required],
    indirizzo: ['', Validators.required],
    jersey: ['', Validators.required],
    latitude: ['', Validators.required],
    longitude: ['', Validators.required],
    
      
  
    });

  constructor(public sanitizer:DomSanitizer,private authService: AuthService,private squadraServiceService: SquadraServiceService, private _form: FormBuilder,private responsive: BreakpointObserver,private jerseyService: JerseyService) { }

  ngOnInit(): void {


    this.squadraServiceService.findAll().subscribe(data => {
      this.squadre = data;

      this.jerseyService.findAll().subscribe(data => {
        this.jersey = data;
       
  
      });

  });

  this.responsive.observe([
    Breakpoints.TabletPortrait,
    Breakpoints.HandsetLandscape])
    .subscribe(result => {

      this.hideForResponsive = false;
  
      const breakpoints = result.breakpoints;
  
      if (result.matches) {
        this.hideForResponsive = true;
      }
  
    });

}

getPath(name: String): String {
return "../../../assets/" + name + ".jpg";

}

getSite(name: String): String {
  
  return  name;
  
  
  }

geturl(latitude: number, longitude: number) {
  
  return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.bing.com/maps/embed?h=160&w=265&cp=" + latitude + "~" + longitude + "&lvl=12&typ=d&sty=r&src=SHELL&FORM=MBEDV8");
  
  }
geturl1() {


  return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.bing.com/maps/embed?h=130&w=370&cp=" + this.latitude + "~" + this.longitude + "&lvl=14&typ=d&sty=r&src=SHELL&FORM=MBEDV8");
  

}


cancella(id:number) {
  this.topFunction();
  this.currentId = id;
  this.areYouSure = true;

  this.squadraServiceService.findById(this.currentId).subscribe(data => 
    this.squadraData = data
    );
}

cancellaSquadra() {



if (this.squadraData.giocate > 0) {
  
  window.alert("Prima Rimouve tuttle la partita di questa Squadra");
}
else  {
  this.squadraServiceService.cancellaSquadraa(this.currentId)
.subscribe(data => console.log(data));
  window.alert("Squadre Cancellato");
}

this.areYouSure = false;
this.ngOnInit();

}

close() {
  
  this.modifybox = false;
  this.areYouSure = false;

}

modifySquadra(id:number) {
  this.topFunction();
  this.modifybox = true;
  this.currentId = id;

  this.squadraServiceService.findById(this.currentId).subscribe(data => 
    this.squadraData = data
    );

 
 }

 modify() {

  this.squadraData.nome = this.form.value.nome;
  this.squadraData.allenatore = this.form.value.allenatore;
  this.squadraData.sito = this.form.value.sito;
  this.squadraData.jersey = this.form.value.jersey;
  this.squadraData.latitude = this.form.value.latitude;
  this.squadraData.longitude = this.form.value.longitude;

  this.squadraServiceService.modifySquadra(this.currentId, this.squadraData)
    .subscribe(data => console.log(data));

    window.alert("Squadra Modificato")
    this.modifybox = false;
    this.ngOnInit();
}

// searchUser() {
//   window.alert(search)
// }

onTableDataChange(event: any) {
  this.page = event;
  this.ngOnInit();
}
onTableSizeChange(event: any): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.ngOnInit();
}

topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

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

}
