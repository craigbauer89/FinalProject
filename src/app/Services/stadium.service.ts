import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Partite } from '../Interfaces/partite';
import { Squadre } from '../Interfaces/squadre';
import { News } from '../Interfaces/news';
import { Stadium } from '../Interfaces/stadium';


@Injectable({
  providedIn: 'root'
})
export class stadiumService {

private stadiumUrl: string;
  private partiteUrl: string;
  private squadreUrl: string;
   private Server = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) { 
    this.stadiumUrl = 'http://localhost:8080/stadium'; 
    this.partiteUrl = 'http://localhost:8080/partite';
    this.squadreUrl = 'http://localhost:8080/squadre';
  //  this.partiteUrl = '/partite';
  //  this.squadreUrl = '/squadre';
  }


  public findById(id: number): Observable<Stadium[]> {
    return this.http.get<Stadium[]>(this.stadiumUrl + '/' + id);
  }

  public findAll(): Observable<Stadium[]> {
    return this.http.get<Stadium[]>(this.stadiumUrl);
  }

  public addstadium(stadium: Stadium) {
    const picture_id = stadium.picture.id;
   
    return this.http.post<Stadium>(this.stadiumUrl+ '/'+ picture_id, stadium);
  }

  modifystadium(id:number,stadium:Stadium){
    const picture_id = stadium.picture.id;
    return this.http.put<Stadium>(this.stadiumUrl + '/'+ id + '/'+ picture_id, stadium);
  }

  cancellastadium(id:number): Observable<any>{
    return this.http.delete(this.stadiumUrl + '/'+ id, {responseType: 'text'});
  }

}

