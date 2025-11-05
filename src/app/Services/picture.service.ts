import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Picture } from '../Interfaces/picture';



@Injectable({
  providedIn: 'root'
})
export class PictureService {

private pictureUrl: string;
   private Server = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) { 
    this.pictureUrl = 'http://localhost:8080/picture'; 

  //  this.partiteUrl = '/partite';
  //  this.squadreUrl = '/squadre';
  }


  public findById(id: number): Observable<Picture[]> {
    return this.http.get<Picture[]>(this.pictureUrl + '/' + id);
  }

  public findAll(): Observable<Picture[]> {
    return this.http.get<Picture[]>(this.pictureUrl);
  }

  public addPlayer(picture: Picture) {
    return this.http.post<Picture>(this.pictureUrl, picture);
  }

  modifyPlayer(id:number,picture:any){
    return this.http.put<Picture>(this.pictureUrl + '/'+ id,picture);
  }

  cancellaPlayer(id:number): Observable<any>{
    return this.http.delete(this.pictureUrl + '/'+ id, {responseType: 'text'});
  }

}

