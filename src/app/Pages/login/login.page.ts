import { Token } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/Interfaces/register';
import { UserService } from 'src/app/Services/user.service';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  hide = true;
  user:Register[] = []
  token!: Token;
  @ViewChild('f') form!: NgForm;
  // error: string = '';
  error: undefined;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }



  invia() {
    // console.log(this.local);
    console.log(this.form.value); 
    this.userService.login(this.form.value)
  .subscribe(
        (resp) => {
          console.log(resp);
          localStorage.setItem('access_token', resp.token);
          this.token = resp;
          this.error = undefined;


      
          this.router.navigate(['squadre']);
        },
        (err) => {
          window.alert("error")
          console.log(err.error);
          // this.error = err.error;
        }
      );
  } 
}


