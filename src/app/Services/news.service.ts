import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Partite } from '../Interfaces/partite';
import { Squadre } from '../Interfaces/squadre';
import { News } from '../Interfaces/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

private newsUrl: string;
  private partiteUrl: string;
  private squadreUrl: string;
   private Server = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) { 
    this.newsUrl = 'http://localhost:8080/news'; 
    this.partiteUrl = 'http://localhost:8080/partite';
    this.squadreUrl = 'http://localhost:8080/squadre';
  //  this.partiteUrl = '/partite';
  //  this.squadreUrl = '/squadre';
  }



  // signclient(obj: Squadre) {
  //   return this.http.post(this.Server + '/squadre', obj);
  // }

  public findById(id: number): Observable<News[]> {
    return this.http.get<News[]>(this.newsUrl + '/' + id);
  }

  public findAll(): Observable<News[]> {
    return this.http.get<News[]>(this.newsUrl);
  }

  public addNews(channel: News) {
    return this.http.post<News>(this.newsUrl, channel);
  }

  modifyNews(id:number,news:any){
    return this.http.put<News>(this.newsUrl + '/'+ id,news);
  }

  cancellaNews(id:number): Observable<any>{
    return this.http.delete(this.newsUrl + '/'+ id, {responseType: 'text'});
  }

}

