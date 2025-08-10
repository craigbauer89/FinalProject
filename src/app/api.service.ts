import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs'; // For observable response
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private competitionsUrlJava: any;

  private apiUrl = 'https://football98.p.rapidapi.com/competitions';
  private headers = new HttpHeaders({
    'x-rapidapi-key': 'a481c741admsh31c3c893b73a335p18efe4jsne047c051fbe7',
    'x-rapidapi-host': 'football98.p.rapidapi.com'
  });

  // private  apiUrl = 'https://api.blackoutrugby.com/v1/player-statistics/a86e4ce6-812f-494e-91ab-c6c6c92935d6';



  constructor(private http: HttpClient) { 

    this.competitionsUrlJava = 'http://localhost:8080/apiCompetitions';
  }

  findAll(): Observable<any> {
      return this.http.get(this.competitionsUrlJava);
    }

  getStandingsNRL(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.headers });
  }

  // fetchTeamData(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl).pipe(
  //     catchError(this.handleError) // Handle errors here
  //   );
  // }

  // private handleError(error: HttpErrorResponse) {
  //   // You can also log to the console or display a user-friendly message
  //   console.error('Error occurred:', error);
  //   return throwError('Something went wrong with the API request. Please try again later.');
  // }
}
