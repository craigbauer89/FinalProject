import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Partite } from '../Interfaces/partite';
import { Squadre } from '../Interfaces/squadre';
import { News } from '../Interfaces/news';
import { Channel } from 'diagnostics_channel';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

private channelUrl: string;
  private partiteUrl: string;
  private squadreUrl: string;
   private Server = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) { 
    this.channelUrl = 'http://localhost:8080/channel'; 
    this.partiteUrl = 'http://localhost:8080/partite';
    this.squadreUrl = 'http://localhost:8080/squadre';
  //  this.partiteUrl = '/partite';
  //  this.squadreUrl = '/squadre';
  }



  public findById(id: number): Observable<Channel[]> {
    return this.http.get<Channel[]>(this.channelUrl + '/' + id);
  }

  public findAll(): Observable<Channel[]> {
    return this.http.get<Channel[]>(this.channelUrl);
  }

  public addChannel(channel: Channel) {
    return this.http.post<Channel>(this.channelUrl, channel);
  }

  modifyChannel(id:number,channel:any){
    return this.http.put<Channel>(this.channelUrl + '/'+ id,channel);
  }

  cancellaChannel(id:number): Observable<any>{
    return this.http.delete(this.channelUrl + '/'+ id, {responseType: 'text'});
  }

}

