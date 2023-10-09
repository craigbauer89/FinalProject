import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { Register } from '../Interfaces/register';
import { User } from '../Interfaces/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  headers2 ={ headers: new HttpHeaders(
    { 'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer',
    })
  }
  requestHeader = new HttpHeaders( {"No Auth" : "True"})
  authSubject = new BehaviorSubject<Register | null>(null);
  private userUrl: string;
  private loginUrl: string;
  private registerUrl: string;
  currentUser = {};

  constructor(private http: HttpClient, private router: Router, private Authservice: AuthService) { 
   this.userUrl = 'http://localhost:8080/users';
   this.loginUrl = 'http://localhost:8080/auth/login';
   this.registerUrl = 'http://localhost:8080/users';
  //this.userUrl = '/users';
  //this.loginUrl = '/auth/login';
  //this.registerUrl = '/users';
  }


  register(obj: any) {
    return this.http.post<any>(this.registerUrl, obj)
   
  }

  login(obj: any) {
    console.log(obj)
    return this.http.post<any>(this.loginUrl, obj)
      
  }

  public roleMatch(allowedRoles:any[]): boolean {
    let isMatch = false;
    const userRoles: any = this.Authservice.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  
      return isMatch;
    
  }




      
  //     , {headers: new HttpHeaders({ 'Content-Type': 'application/json' })})
  //   .pipe(map((resp) => {
  //     sessionStorage.setItem('user', obj.username);
  //     sessionStorage.setItem('token', 'HTTP_TOKEN ' + resp.token);
  //     return resp;
  //   }));
  // }


      // .subscribe(
      //   (resp) => {
      //     console.log(resp);
      //     localStorage.setItem('access_token', resp.token);
          // this.token = resp;
          // this.error = undefined;


       
  
          // this.router.navigate(['squadre']);
      //   },
      //   (err) => {
      //     window.alert("error")
      //     console.log(err.error);
      //     // this.error = err.error;
      //   }
      // );
      // this.getUserProfile(res.id).subscribe((res) => {
      //   this.currentUser = res;
        
      // });
    // }
    // return this.http.post<any>(this.loginUrl, obj, {headers: this.requestHeader});
    
  

  // getUserProfile(id: any): Observable<any> {
  //   return this.http.get(this.userUrl +"/" +id, { headers: this.headers }).pipe(
  //     map((res) => {
  //       return res || {};
  //     }),
  //     catchError(this.handleError)
  //   );
  // }

  // getToken() {
  //   return localStorage.getItem('token');
  // }

}

// }

  // handleError(error: HttpErrorResponse) {
  //   let msg = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // client-side error
  //     msg = error.error.message;
  //   } else {
  //     // server-side error
  //     msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   return throwError(msg);
  // }
