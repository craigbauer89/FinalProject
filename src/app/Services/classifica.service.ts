import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classifica } from '../Interfaces/classifica';
import { Observable } from 'rxjs';
import { Squadre } from '../Interfaces/squadre';

@Injectable({
  providedIn: 'root'
})
export class ClassificaService {

  private classificaUrl: string;
private Server = 'http://localhost:8080';

 constructor(private http: HttpClient, ) { 
     this.classificaUrl = 'http://localhost:8080/classifica';
   
   }

    public findAll(): Observable<Classifica[]> {
       return this.http.get<Classifica[]>(this.classificaUrl);
     }

   public findAllbyChampionship(id: number): Observable<Classifica[]> {
      return this.http.get<Classifica[]>(this.classificaUrl+ '/' + 'by-championship'+ '/'+ id);
    }

    public findAllbySquadra(id: number, year:string): Observable<Classifica[]> {
      return this.http.get<Classifica[]>(this.classificaUrl+ '/' + 'by-squadra'+ '/'+ id + '/'+ year);
    }

  public findById(id: number): Observable<Classifica> {
    return this.http.get<Classifica>(this.classificaUrl + '/' + id);
  }
	
	
	public addClassifica(classifica: Classifica) {
      const championship_id = classifica.championship.id;
      return this.http.post<Classifica>(this.classificaUrl + '/'+ championship_id, classifica);
  }
	

  public addClassificaSquadra( classifica_id:number, squadra_id:number) {
    return this.http.post<Classifica>(this.classificaUrl + '/'+ classifica_id + '/'+ squadra_id, 
      {});
  }

  public  modifyClassifica(id:number, classifica:Classifica,championship_id:number){
      return this.http.put<Classifica>(this.classificaUrl + '/'+ id + '/'+ championship_id , classifica);
  }
	
  cancellaClassifica(id:number): Observable<any>{
    return this.http.delete(this.classificaUrl + '/'+ id, {responseType: 'text'});
  }
  
  cancellaClassificaSquadra(classifica_id:number, squadra_id:number): Observable<any>{
   // const squadra_id = squadra.id;
    return this.http.delete(this.classificaUrl + '/'+ classifica_id + '/'+ squadra_id);
  }
	
}
