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

  console.log(this.authService.getRoles())
  console.log(this.authService.getToken())
  console.log(this.authService.isLoggedIn())

  }

  public isLoggedIn() {

    return this.authService.isLoggedIn();
  }

  public Logout() {

    this.authService.clear();
    this.router.navigate(['home']);
  }

  closeMenu(): void {
    
    const checkbox = document.getElementById(
      'menuButton',
    ) as HTMLInputElement | null;
    
    if (checkbox != null) {
      checkbox.checked = false;
    }
    }
}
