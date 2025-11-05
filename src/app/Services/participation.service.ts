import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Partite } from '../Interfaces/partite';
import { Squadre } from '../Interfaces/squadre';
import { News } from '../Interfaces/news';
import { Stadium } from '../Interfaces/stadium';
import { Player } from '../Interfaces/player';
import { Pariticpation } from '../Interfaces/participation';


@Injectable({
  providedIn: 'root'
})
export class ParticipationService {

private participationUrl: string;
  private partiteUrl: string;
  private squadreUrl: string;
   private Server = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) { 
    this.participationUrl = 'http://localhost:8080/participation'; 
    this.partiteUrl = 'http://localhost:8080/partite';
    this.squadreUrl = 'http://localhost:8080/squadre';
  //  this.partiteUrl = '/partite';
  //  this.squadreUrl = '/squadre';
  }


  public findById(id: number): Observable<Pariticpation[]> {
    return this.http.get<Pariticpation[]>(this.participationUrl + '/' + id);
  }

  public findAll(): Observable<Pariticpation[]> {
    return this.http.get<Pariticpation[]>(this.participationUrl);
  }

  public findAllByClassifcaId(id:number): Observable<Pariticpation[]> {
    return this.http.get<Pariticpation[]>(this.participationUrl+ '/'+ 'classifica' + '/'+id);
  }

  public addPariticpation(pariticpation: Pariticpation) {
    const classifica_id = pariticpation.classifica.id;
    const squadra_id = pariticpation.squadra.id;
  //  return this.http.post<Stadium>(this.participationUrl+ '/'+ classifica_id+ '/'+ squadra_id, player);
      return this.http.post<Stadium>(this.participationUrl,  pariticpation);

  }

  modifyPlayer(id:number,pariticpation:any){
    const classifica_id = pariticpation.classifica.id;
    const squadra_id = pariticpation.squadra.id;
  //  return this.http.put<Stadium>(this.playerUrl + '/'+ id + '/'+ picture_id+ '/'+ squadra_id,player);
    return this.http.put<Stadium>(this.participationUrl  + '/'+ id,pariticpation);

  }

  cancellaPlayer(id:number): Observable<any>{
    return this.http.delete(this.participationUrl + '/'+ id, {responseType: 'text'});
  }

}
