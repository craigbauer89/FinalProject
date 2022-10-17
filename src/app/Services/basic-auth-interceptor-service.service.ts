import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthInterceptorServiceService implements HttpInterceptor {

  constructor(private userService: UserService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
      const authToken = this.userService.getToken();
      req = req.clone({
        headers: new HttpHeaders({
              Authorization: "Bearer " + authToken
            })
      });
      return next.handle(req);
  }

  
    
   
  
}
