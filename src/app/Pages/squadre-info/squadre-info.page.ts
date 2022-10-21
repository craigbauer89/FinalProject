import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Squadre } from 'src/app/Interfaces/squadre';
import { SquadraServiceService } from 'src/app/Services/squadra-service.service';

@Component({
  templateUrl: './squadre-info.page.html',
  styleUrls: ['./squadre-info.page.scss']
})
export class SquadreInfoPage implements OnInit {

  @ViewChild('f') form!: NgForm;
  currentId = 0;
  areYouSure = false;
  modifybox = false;
  error = undefined;
  path = " ";
  cat =  "../../../assets/Velate.jpg";

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

}
