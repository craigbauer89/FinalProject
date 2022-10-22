import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Squadre } from 'src/app/Interfaces/squadre';
import { SquadraServiceService } from 'src/app/Services/squadra-service.service';

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
  tableSize: number = 6;
  tableSizes: any = [3, 6, 9, 12];

cat1 = "https://www.w3schools.com";

  squadre: Squadre[] = [];

  SquadreRegisterFormGroup = this._form.group({
    nome: ['', Validators.required],
    allenatore: ['', Validators.required],
    sito: ['', Validators.required],
    indirizzo: ['', Validators.required],
    latitude: ['', Validators.required],
    longitude: ['', Validators.required],
    
      
  
    });

  constructor(public sanitizer:DomSanitizer, private squadraServiceService: SquadraServiceService, private _form: FormBuilder) { }

  ngOnInit(): void {


    this.squadraServiceService.findAll().subscribe(data => {
      this.squadre = data;
  });

}

getPath(name: String): String {
return "../../../assets/" + name + ".jpg";

}

geturl(latitude: number, longitude: number) {
  
  return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.bing.com/maps/embed?h=150&w=300&cp=" + latitude + "~" + longitude + "&lvl=13&typ=d&sty=r&src=SHELL&FORM=MBEDV8");
  
  }
geturl1() {


  return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.bing.com/maps/embed?h=130&w=300&cp=" + this.latitude + "~" + this.longitude + "&lvl=14&typ=d&sty=r&src=SHELL&FORM=MBEDV8");
  

}


cancella(id:number) {
  this.currentId = id;
  this.areYouSure = true;
}

cancellaSquadra() {

this.squadraServiceService.cancellaSquadraa(this.currentId)
.subscribe(data => console.log(data));
this.areYouSure = false;
window.alert("Item Removed")
this.ngOnInit();
}

close() {
  this.modifybox = false;
  this.areYouSure = false;

}

modifySquadra(id:number) {
  this.modifybox = true;
  this.currentId = id;

 }

 modify() {

  this.squadraServiceService.modifySquadra(this.currentId, this.form.value)
    .subscribe(data => console.log(data));

    window.alert("Item Modifyed")
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

}
