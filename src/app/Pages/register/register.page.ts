import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }


  invia() {
    // console.log(this.local);
    console.log(this.form.value); 
    this.userService.login(this.form.value)
  .subscribe(
        (resp) => {
          console.log(resp.user);
          console.log(resp.user.roles);
          this.authService.setRoles(resp.user.roles);
          localStorage.setItem('access_token', resp.jwtToken);

          const role = resp.user.roles[0].id;
          if (role === 1) {
            this.router.navigate(['registerpartite']);
          }

          // this.token = resp;
          // this.error = undefined;


      else {
        this.router.navigate(['login']);
      }
          
        },
        (err) => {
          window.alert("error")
          console.log(err.error);
          // this.error = err.error;
        }
      );
  } 
}



