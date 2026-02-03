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
   private Server = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) { 
     this.partiteUrl = 'http://localhost:8080/partite';
    this.squadreUrl = 'http://localhost:8080/squadre';
  //  this.partiteUrl = '/partite';
  //  this.squadreUrl = '/squadre';
  }



  // signclient(obj: Squadre) {
  //   return this.http.post(this.Server + '/squadre', obj);
  // }

  public findById(id: number): Observable<Partite> {
    return this.http.get<Partite>(this.partiteUrl + '/' + id);
  }

  public findAll(): Observable<Partite[]> {
    return this.http.get<Partite[]>(this.partiteUrl);
  }

  public findAllByYear(year: number): Observable<Partite[]> {
    return this.http.get<Partite[]>(this.partiteUrl + '/' + 'by-year' + '/' + year);
  }

  public findAllBySeason(start: Date, end: Date): Observable<Partite[]> {
    return this.http.get<Partite[]>(this.partiteUrl + '/' + 'by-season' + '/' + start + '/' + end);
  }

  public findAllBySquadra(squadra_id: number): Observable<Partite[]> {
    return this.http.get<Partite[]>(this.partiteUrl + '/' + 'by-squadra' + '/' + squadra_id);
  }

  public findAllByClassifica(classific_id: number): Observable<Partite[]> {
    return this.http.get<Partite[]>(this.partiteUrl + '/' + 'by-classifica' + '/' + classific_id);
  }

  public findAllChampionshipFixtures(Championship_id: number): Observable<Partite[]> {
    return this.http.get<Partite[]>(this.partiteUrl + '/' + 'by-fixtures' + '/' + Championship_id);
  }

  public findAllChampionshipResults(Championship_id: number): Observable<Partite[]> {
    return this.http.get<Partite[]>(this.partiteUrl + '/' + 'by-results' + '/' + Championship_id);
  }

  public addPartita(partita: Partite) {
    const channel_id = partita.channel.id;
    const stadium_id = partita.stadium.id;
    return this.http.post<Partite>(this.partiteUrl + '/' + channel_id  + '/'+  stadium_id, partita);
  }

  modifySquadra(id:number, squandra:any){
    return this.http.put<Squadre>(this.squadreUrl + '/'+ id, squandra);
  }

  modifyPartita(id:number, partita:any){
    const channel_id = partita.channel.id;
    const stadium_id = partita.stadium.id;
    return this.http.put<Partite>(this.partiteUrl + '/'+ id+ '/' + channel_id  + '/'+  stadium_id, partita);
  }

  cancellaPartita(id:number): Observable<any>{
    return this.http.delete(this.partiteUrl + '/'+ id, {responseType: 'text'});
  }

}

