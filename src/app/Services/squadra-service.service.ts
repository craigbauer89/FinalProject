import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Squadre } from '../Interfaces/squadre';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SquadraServiceService {

  private squadreUrl: string;
  // private Server = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) { 
    this.squadreUrl = 'http://localhost:8080/squadre';
  }



  // signclient(obj: Squadre) {
  //   return this.http.post(this.Server + '/squadre', obj);
  // }


  public findAll(): Observable<Squadre[]> {
    return this.http.get<Squadre[]>(this.squadreUrl);
  }

  public signclient(squadra: Squadre) {
    return this.http.post<Squadre>(this.squadreUrl, squadra);
  }


}
