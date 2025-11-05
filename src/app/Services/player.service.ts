import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Partite } from '../Interfaces/partite';
import { Squadre } from '../Interfaces/squadre';
import { News } from '../Interfaces/news';
import { Stadium } from '../Interfaces/stadium';
import { Player } from '../Interfaces/player';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {

private playerUrl: string;
  private partiteUrl: string;
  private squadreUrl: string;
   private Server = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) { 
    this.playerUrl = 'http://localhost:8080/player'; 
    this.partiteUrl = 'http://localhost:8080/partite';
    this.squadreUrl = 'http://localhost:8080/squadre';
  //  this.partiteUrl = '/partite';
  //  this.squadreUrl = '/squadre';
  }


  public findById(id: number): Observable<Player[]> {
    return this.http.get<Player[]>(this.playerUrl + '/' + id);
  }

  public findAll(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playerUrl);
  }

  public addPlayer(player: Player) {
    const picture_id = player.picture.id;
    const squadra_id = player.squadre.id;
    return this.http.post<Stadium>(this.playerUrl+ '/'+ picture_id+ '/'+ squadra_id, player);
  }

  modifyPlayer(id:number,player:any){
    const picture_id = player.picture.id;
    const squadra_id = player.squadre.id;
    return this.http.put<Stadium>(this.playerUrl + '/'+ id + '/'+ picture_id+ '/'+ squadra_id,player);
  }

  cancellaPlayer(id:number): Observable<any>{
    return this.http.delete(this.playerUrl + '/'+ id, {responseType: 'text'});
  }

}

