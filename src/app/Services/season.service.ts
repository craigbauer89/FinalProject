import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Championship } from '../Interfaces/championship';
import { Season } from '../Interfaces/season';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

private seasonUrl: string;
private Server = 'http://localhost:8080';

  constructor(private http: HttpClient,) {
    this.seasonUrl = 'http://localhost:8080/season';

   }

  public findAll(): Observable<Season[]> {
    return this.http.get<Season[]>(this.seasonUrl);
  }
	

  public findById(id: number): Observable<Season> {
    return this.http.get<Season>(this.seasonUrl + '/' + id);
  }
	

  public addSeason(season: Season) {
    return this.http.post<Season>(this.seasonUrl, season);
  }

  public modifySeason(id:number, season:any){
    return this.http.put<Season>(this.seasonUrl + '/'+ id, season);
  }
	
  public cancellaSeason(id:number): Observable<any>{
    return this.http.delete(this.seasonUrl + '/'+ id, {responseType: 'text'});
  }
	
}
