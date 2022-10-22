import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Squadre } from 'src/app/Interfaces/squadre';
import { SquadraServiceService } from 'src/app/Services/squadra-service.service';

@Component({
  templateUrl: './squadre-info.page.html',
  styleUrls: ['./squadre-info.page.scss']
})
export class SquadreInfoPage implements OnInit {

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




  squadre: Squadre[] = [];

  SquadreRegisterFormGroup = this._form.group({
    nome: ['', Validators.required],
    
      
  
    });

  constructor(private squadraServiceService: SquadraServiceService, private _form: FormBuilder) { }

  ngOnInit(): void {


    this.squadraServiceService.findAll().subscribe(data => {
      this.squadre = data;
  });

}

getPath(name: String): String {
return "../../../assets/" + name + ".jpg";

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
