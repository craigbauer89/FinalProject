import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Squadre } from 'src/app/Interfaces/squadre';
import { SquadraServiceService } from 'src/app/Services/squadra-service.service';

@Component({
  selector: 'app-form-register-squadre',
  templateUrl: './form-register-squadre.component.html',
  styleUrls: ['./form-register-squadre.component.scss']
})
export class FormRegisterSquadreComponent implements OnInit {

  // squadra: Squadre;

  @ViewChild('f') form!: NgForm;
  hide = true;
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  error = undefined;
  

  SquadreRegisterFormGroup = this._form.group({
    nome: ['', Validators.required],
    allenatore: ['', Validators.required],
    sito: ['', Validators.required],
    indirizzo: ['', Validators.required],
    latitude: ['', Validators.required],
    longitude: ['', Validators.required],
    // location: ['', Validators.required],
    

  });

  constructor(private route: ActivatedRoute, private SquadreServiceservice: SquadraServiceService,private router: Router,
    private _form: FormBuilder) { 

      // this.squadra = new Squadre();
    }

  ngOnInit(): void {
  }

  onSubmit() {

    
    this.SquadreServiceservice.signclient(this.form.value).subscribe(
      resp => {
        console.log(resp);
        window.alert("Squadra aggiunta");
        this.error = undefined;
        this.router.navigate(['/squadre'])
      },
      err  => {
        console.log(err.error);
        window.alert("Errore");
        this.error = err.error;
      }
    )
  }

}
