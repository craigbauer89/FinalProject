import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Partite } from '../Interfaces/partite';

@Injectable({
  providedIn: 'root'
})
export class PartiteService {

  private partiteUrl: string;
  // private Server = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) { 
    this.partiteUrl = 'http://localhost:8080/partite';
    
  }



  // signclient(obj: Squadre) {
  //   return this.http.post(this.Server + '/squadre', obj);
  // }


  public findAll(): Observable<Partite[]> {
    return this.http.get<Partite[]>(this.partiteUrl);
  }

  public addPartita(partita: Partite) {
    return this.http.post<Partite>(this.partiteUrl, partita);
  }


}

