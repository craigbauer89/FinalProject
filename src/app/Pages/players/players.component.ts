import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Jersey } from 'src/app/Interfaces/jersey';
import { Picture } from 'src/app/Interfaces/picture';
import { Player } from 'src/app/Interfaces/player';
import { Squadre } from 'src/app/Interfaces/squadre';
import { AuthService } from 'src/app/Services/auth.service';
import { JerseyService } from 'src/app/Services/jersey.service';
import { PictureService } from 'src/app/Services/picture.service';
import { PlayerService } from 'src/app/Services/player.service';
import { SquadraServiceService } from 'src/app/Services/squadra-service.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  isScreenSmall: boolean = false;
  isScreenMed: boolean = false;
  isScreenBig: boolean = false;
  isScreenXLarge: boolean = false;
  isScreenLarge: boolean = false;

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
  tableSize: number = 9;
  tableSizes: any = [3, 6, 9, 12];
  hideForResponsive = false;
  jersey: Jersey[] = [];

  playerData:any ={
    id: '',
name: '',
tries: '',
punti: '',
gialli: '',
rossi: '',
 picture: '',
squadre: '',
  }

  client:any = {
    ragioneSociale: '',
    telefono: '',
    emailAziendale: '',
    nomeContatto: '',
    
};

@HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
    
  }

  private checkScreenSize(): void {
    this.isScreenSmall = window.innerWidth < 1100; 
    this.isScreenMed = window.innerWidth > 1100 && window.innerWidth < 1445; 
  this. isScreenBig = window.innerWidth > 1445 && window.innerWidth < 1800; 
  this. isScreenLarge = window.innerWidth > 1800 && window.innerWidth < 2400;  
  this. isScreenXLarge= window.innerWidth > 2400;
  if (this.isScreenSmall )
  {
    this.tableSize = 8;
  }
  else if (this.isScreenMed ){
    this.tableSize = 9;
  }
  else if (this.isScreenBig ){
    this.tableSize = 8;
  }
  else if (this.isScreenLarge ){
    this.tableSize = 10;
  }
  else if (this.isScreenXLarge ){
    this.tableSize = 12;
  }
  }


cat1 = "https://www.w3schools.com";

  squadre: Squadre[] = [];
  players: Player[] = [];
  picture: Picture [] = [];

  PlayerModifyFormGroup = this._form.group({
      name: ['', Validators.required],
      tries: ['', Validators.required],
      punti: ['', Validators.required],
      gialli: ['', Validators.required],
      rossi: ['', Validators.required],
        picture: [null as Picture | null, Validators.required],
      squadre: [null as Squadre | null, Validators.required],
    });

  constructor(private pictureService: PictureService,private playersService: PlayerService, public sanitizer:DomSanitizer,private authService: AuthService,private squadraServiceService: SquadraServiceService, private _form: FormBuilder,private responsive: BreakpointObserver,private jerseyService: JerseyService) { }

  ngOnInit(): void {


    this.pictureService.findAll().subscribe( data => {
      this.picture = data;
      console.log(data);
      });

    this.checkScreenSize();

    this.squadraServiceService.findAllSorted().subscribe(data => {
      this.squadre = data;

      this.playersService.findAll().subscribe(data => {
        this.players = data;

      });

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

  this.playersService.findById(this.currentId).subscribe(data => 
    this.playerData = data
    );
}

cancellaPlayer() {

  this.playersService.cancellaPlayer(this.currentId)
.subscribe(data => console.log(data));
  window.alert("Player Cancellato");


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

  this.playersService.findById(this.currentId).subscribe(data => 
    this.playerData = data
    );

 
 }

 modify() {

  // this.squadraData.nome = this.form.value.nome;
  // this.squadraData.allenatore = this.form.value.allenatore;
  // this.squadraData.sito = this.form.value.sito;
  // this.squadraData.jersey = this.form.value.jersey;
  // this.squadraData.latitude = this.form.value.latitude;
  // this.squadraData.longitude = this.form.value.longitude;

  this.playersService.modifyPlayer(this.currentId, this.form.value)
    .subscribe(data => console.log(data));

    window.alert("Player Modificato")
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
