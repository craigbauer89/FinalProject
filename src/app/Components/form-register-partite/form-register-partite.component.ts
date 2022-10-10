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

    ngOnInit()  {

      this.SquadreServiceservice.findAll().subscribe(data => {
        this.squadre = data;
        // console.log(JSON.stringify(data));
        // console.log(this.squadre[1]);
        // for(let cat in this.squadre) {
          // console.log(this.squadre);
          this.dataSource = this.squadre ;
          console.log(this.dataSource);
        // }
      });
    }

  onSubmit() {

    
    this.Partitaservice.addPartita(this.form.value).subscribe(
      resp => {
        console.log(resp);
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
  }

}
