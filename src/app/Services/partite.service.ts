import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Partite } from '../Interfaces/partite';
import { Squadre } from '../Interfaces/squadre';

@Injectable({
  providedIn: 'root'
})
export class PartiteService {

  private partiteUrl: string;
  private squadreUrl: string;
  // private Server = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) { 
    this.partiteUrl = 'http://localhost:8080/partite';
    this.squadreUrl = 'http://localhost:8080/squadre';
    
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

  modifySquadra(id:number, squandra:any){
    return this.http.put<Squadre>(this.squadreUrl + '/'+ id, squandra);
  }

  modifyPartita(id:number, partita:any){
    return this.http.put<Partite>(this.partiteUrl + '/'+ id, partita);
  }

  cancellaPartita(id:number): Observable<any>{
    return this.http.delete(this.partiteUrl + '/'+ id, {responseType: 'text'});
  }

}

