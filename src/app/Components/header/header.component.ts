import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showlogout = false;
  showlogin = true;

  constructor(private authService: AuthService, private router: Router, public userService: UserService) { }

  ngOnInit(): void {

  // console.log(this.authService.isLoggedIn())
  console.log(this.authService.getRoles())
  console.log(this.authService.getToken())
  console.log(this.authService.isLoggedIn())

  }

  public isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  public Logout() {
    // this.showlogin = true;
    // this.showlogout = false;
    this.authService.clear();
    this.router.navigate(['registerpartite']);
   
    
  }

//   showLogout() {
//     this.showlogin = false;
//     this.showlogout = true;
    
// }
}
