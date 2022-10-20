import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {

  @ViewChild('f') form!: NgForm;
  hide = true;

  RegisterFormGroup = this._form.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    

  });

  constructor(private userService: UserService, private authService: AuthService, private router: Router, private _form: FormBuilder) { }

  ngOnInit(): void {
  }


  invia() {
    // console.log(this.local);
    console.log(this.form.value); 
    this.userService.register(this.form.value).subscribe(
      (resp) => {
        console.log(resp);
        window.alert("Registrato! Adesso Fai Login ")
        this.router.navigate(['login']);
      
          
        },
        (err) => {
          window.alert("Username gia in Uso!")
          console.log(err.error);
          // this.error = err.error;
        }
      );
  } 

  login() {
    this.router.navigate(['login']);
  }
}



