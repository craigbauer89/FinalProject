import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Jersey } from '../Interfaces/jersey';

@Injectable({
  providedIn: 'root'
})
export class JerseyService {

  private jerseyUrl: string;
   private Server = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) { 
     this.jerseyUrl = 'http://localhost:8080/jersey';
  //  this.jerseyUrl = '/jersey';
    
  }


  public findAll(): Observable<Jersey[]> {
    return this.http.get<Jersey[]>(this.jerseyUrl);
  }

  public addJersey(jersey: Jersey) {
    return this.http.post<Jersey>(this.jerseyUrl, jersey);
  }

  modifyJersey(id:number, jersey:any){
    return this.http.put<Jersey>(this.jerseyUrl + '/'+ id, jersey);
  }

  

  cancellaJersey(id:number): Observable<any>{
    return this.http.delete(this.jerseyUrl + '/'+ id, {responseType: 'text'});
  }



}
