import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Squadre } from 'src/app/Interfaces/squadre';
import { SquadraServiceService } from 'src/app/Services/squadra-service.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { Jersey } from 'src/app/Interfaces/jersey';
import { JerseyService } from 'src/app/Services/jersey.service';

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
  hideForResponsive = false;
  jersey: Jersey[] = [];
  squadre: Squadre[] = [];
  dataSource = this.jersey ;
  

  SquadreRegisterFormGroup = this._form.group({
    nome: ['', Validators.required],
    allenatore: ['', Validators.required],
    sito: ['', Validators.required],
    indirizzo: ['', Validators.required],
    jersey: ['', Validators.required],
    latitude: ['', Validators.required],
    longitude: ['', Validators.required],
    // location: ['', Validators.required],
    

  });

  constructor(private route: ActivatedRoute, private SquadreServiceservice: SquadraServiceService,private router: Router,
    private _form: FormBuilder, private responsive: BreakpointObserver, private jerseyService: JerseyService) { 

      // this.squadra = new Squadre();
    }

  ngOnInit(): void {

    this.jerseyService.findAll().subscribe(data => {
      this.jersey = data;
      this.dataSource = this.jersey ;

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
        window.alert("Errore champ");
        this.error = err.error;
      }
    )
  }

}
