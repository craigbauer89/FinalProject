import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Squadre } from '../Interfaces/squadre';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private squadreUrl: string;
  private squadreUrlSorted: string;
  private Server = 'http://localhost:8080';
  

  constructor(private http: HttpClient) { 
    //this.squadreUrl = '/squadre';
    this.squadreUrl = 'http://localhost:8080/squadre';
    //this.squadreUrlSorted = '/squadre/sorted';
    this.squadreUrlSorted = 'http://localhost:8080/squadre/sortedbruv';
  }

  public findById(id: number): Observable<Squadre> {
    return this.http.get<Squadre>(this.squadreUrl + '/' + id);
  }


  public findAll(): Observable<Squadre[]> {
    return this.http.get<Squadre[]>(this.squadreUrl);
  }

  public findAllbyClassifica(id: number): Observable<Squadre[]> {
      return this.http.get<Squadre[]>(this.squadreUrl+ '/' + 'by-classifica'+ '/'+ id);
    }

  public findAllSorted(): Observable<Squadre[]> {
    return this.http.get<Squadre[]>(this.squadreUrlSorted);
  }

  public signclient(squadra: Squadre) {
    return this.http.post<Squadre>(this.squadreUrl, squadra);
  }

  modifySquadra(id:number, squandra:any){
    return this.http.put<Squadre>(this.squadreUrl + '/' + id, squandra);
  }

  cancellaSquadraa(id:number): Observable<any>{
    return this.http.delete(this.squadreUrl + '/'+ id, {responseType: 'text'});
  }

}
