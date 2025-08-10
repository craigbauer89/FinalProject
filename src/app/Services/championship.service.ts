import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Championship } from '../Interfaces/championship';


@Injectable({
  providedIn: 'root'
})
export class ChampionshipService {

private championshipUrl: string;
private Server = 'http://localhost:8080';

  constructor(private http: HttpClient, ) { 
    this.championshipUrl = 'http://localhost:8080/championship';
  
  }

  public findById(id: number): Observable<Championship> {
    return this.http.get<Championship>(this.championshipUrl + '/' + id);
  }

  public findAll(): Observable<Championship[]> {
    return this.http.get<Championship[]>(this.championshipUrl);
  }

  public findAllbySeason(id: number): Observable<Championship[]> {
    return this.http.get<Championship[]>(this.championshipUrl+ '/' + 'by-season'+ '/'+ id);
  }

  public addChampionship(championship: Championship) {
    const season_id = championship.season.id;
    return this.http.post<Championship>(this.championshipUrl + '/'+ season_id, championship);
  }

  public addChampionshipSeason( championship_id:number, season_id:number) {
    return this.http.post<Championship>(this.championshipUrl + '/'+ championship_id + '/'+ season_id, 
    {});
  }

  modifyChampionship(id:number, championship:any){
    return this.http.put<Championship>(this.championshipUrl + '/'+ id, championship);
  }

  cancellaChampionship(id:number): Observable<any>{
    return this.http.delete(this.championshipUrl + '/'+ id, {responseType: 'text'});
  }
  
  cancellaChampionshipSeason(championship_id:number, season_id:number): Observable<any>{
    return this.http.delete(this.championshipUrl + '/'+ championship_id + '/'+ season_id);
  }

	


}
