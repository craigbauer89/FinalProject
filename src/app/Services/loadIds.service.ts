import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Partite } from '../Interfaces/partite';
import { Squadre } from '../Interfaces/squadre';
import { News } from '../Interfaces/news';
import { Channel } from '../Interfaces/channel';
import { LoadIds } from '../Interfaces/LoadIds';

@Injectable({
  providedIn: 'root'
})

export class LoadIdsService {

    private loadIdsUrl: string;
   private Server = 'http://localhost:8080';

   constructor(private http: HttpClient, private router: Router) { 
    this.loadIdsUrl = 'http://localhost:8080/loadIds'; 
  //  this.loadIdsUrl = '/loadIds';
  }

  public findById(id: number): Observable<LoadIds> {
    return this.http.get<LoadIds>(this.loadIdsUrl + '/' + id);
  }

  public findAll(): Observable<LoadIds[]> {
    return this.http.get<LoadIds[]>(this.loadIdsUrl);
  }

  public addLoadIds(loadIds: LoadIds) {
    return this.http.post<LoadIds>(this.loadIdsUrl, loadIds);
  }

  modifyoadIds(id:number,loadIds:any){
    return this.http.put<LoadIds>(this.loadIdsUrl + '/'+ id,loadIds);
  }

  cancellaoadIds(id:number): Observable<any>{
    return this.http.delete(this.loadIdsUrl + '/'+ id, {responseType: 'text'});
  }



}