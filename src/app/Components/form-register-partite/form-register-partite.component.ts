import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Partite } from 'src/app/Interfaces/partite';
import { Squadre } from 'src/app/Interfaces/squadre';
import { PartiteService } from 'src/app/Services/partite.service';
import { SquadraServiceService } from 'src/app/Services/squadra-service.service';

@Component({
  selector: 'app-form-register-partite',
  templateUrl: './form-register-partite.component.html',
  styleUrls: ['./form-register-partite.component.scss']
})
export class FormRegisterPartiteComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  hide = true;
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  error = undefined;
  

  partite: Partite[] = [];
  squadre: Squadre[] = [];
  dataSource = this.squadre ;

 PartiteRegisterFormGroup = this._form.group({
  date: ['', Validators.required],
  squadra1: ['', Validators.required],
  squadra2: ['', Validators.required],
  puntisquadra1: ['', Validators.required],
  puntisquadra2: ['', Validators.required],
  meteSquadra1: ['', Validators.required],
  meteSquadra2: ['', Validators.required],
    

  });

  constructor(private route: ActivatedRoute,private Partitaservice: PartiteService, private SquadreServiceservice: SquadraServiceService,private router: Router,
    private _form: FormBuilder) { 

      // this.squadra = new Squadre();
    }

    test() {

    }

    ngOnInit()  {

      

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

    
    this.Partitaservice.addPartita(this.form.value).subscribe(
      resp => {
        // console.log(resp);
        window.alert("Partita aggiunta");
        this.error = undefined;
        this.router.navigate(['/partite'])
      },
      err  => {
        console.log(err.error);
        window.alert("Errore");
        this.error = err.error;
      }
    )

    let squadra1 = this.form.value.squadra1;  // velate
    squadra1.puntiFatti += this.form.value.puntisquadra1;  // 10 (+10 ) 20
    squadra1.puntiSubiti += this.form.value.puntisquadra2; // 20 (+10) 30
    squadra1.meteFatti += this.form.value.meteSquadra1; // 1  (+2 ) 3
    squadra1.meteSubiti += this.form.value.meteSquadra2; // 2 (+2 ) 4
    let currentGameSq1Diff= this.form.value.puntisquadra1-this.form.value.puntisquadra2 // 0
    squadra1.differenza += currentGameSq1Diff; // -10  (+0) -10
    squadra1.giocate += 1; // 1 (+1) 2
    if (currentGameSq1Diff > 0) {  // no  no
      squadra1.vittorie += 1; // (+0) 0
      squadra1.punti += 4; // (+0) 0 
    }
    else if(currentGameSq1Diff < 0)  { 
      squadra1.sconfitte += 1;  // 1  (+0) 0
      
    }
    else {
      squadra1.pareggi += 1; // 0  (+1) 1
      squadra1.punti += 2; // 0 (+2) 2
    }

    this.SquadreServiceservice.modifySquadra(squadra1.id, squadra1)
    .subscribe(data => console.log(data));

    let squadra2 = this.form.value.squadra2;  // serengo
    squadra2.puntiFatti += this.form.value.puntisquadra2; // 20 (+10 ) 30
    squadra2.puntiSubiti += this.form.value.puntisquadra1; // 10 (+10) 20
    squadra2.meteFatti += this.form.value.meteSquadra2; // 2  (+2 ) 4
    squadra2.meteSubiti += this.form.value.meteSquadra1; //1  (+2 ) 3
    let currentGameSq2Diff= this.form.value.puntisquadra2-this.form.value.puntisquadra1 // 0
    squadra2.differenza += currentGameSq2Diff; // 10 (+0) 10
    squadra2.giocate += 1; // 1 (+1) 2
    if (currentGameSq2Diff > 0) { // yes  no
      squadra2.vittorie += 1;  //1   (+0) 1
      squadra2.punti += 4; // 4 (+0) 4
    }
    else if(currentGameSq2Diff < 0)  { // no  no
      squadra2.sconfitte += 1; // 0 (+0) 0
    }
    else {
      squadra2.pareggi += 1; // 0  (+1) 1
      squadra2.punti += 2; // 0 (+2) 1
    }
    // console.log(this.form.value.squadra1.puntiFatti)
    // console.log(this.form.value.squadra1.id)

    this.SquadreServiceservice.modifySquadra(squadra2.id, squadra2)
    .subscribe(data => console.log(data));


  }

}


