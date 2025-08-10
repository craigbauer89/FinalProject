import { Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Partite } from 'src/app/Interfaces/partite';
import { Squadre } from 'src/app/Interfaces/squadre';
import { PartiteService } from 'src/app/Services/partite.service';
import { SquadraServiceService } from 'src/app/Services/squadra-service.service';
import { ApiService } from 'src/app/api.service';


@Component({
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss']
})


export class LandingPage implements OnInit {

  @ViewChild(MatSort)
  sort!: MatSort;
  element: any;
  hideForResponsive = false;
  hideForResponsivePhone = false;
  currentId = 0;
  partite: Partite[] = [];

  squadre: Squadre[] = [];

displayedColumns: string[] = [ 'img', 'nome', 'punti', 'differenza' ];
  dataSource = new MatTableDataSource(this.squadre) ;


  // displayedColumns2: string[] = ['date', 'img1', 'squadra1.nome', 'puntisquadra1', 'puntisquadra2', 'squadra2.nome', 'img2' ];
  displayedColumns2: string[] = ['img1', 'puntisquadra1', 'dash',  'puntisquadra2', 'img2' ];
  dataSource2: Partite[] = [];
  standingsData: any; 

  teamData: any = null;
  errorMessage: string = '';

  competitions: any;

  constructor(private apiService: ApiService, private squadraServiceService: SquadraServiceService,private partiteService: PartiteService) { }
 
  
  ngOnInit()  {

    this.squadraServiceService.findAll().subscribe(data => {
      this.squadre = data;

        this.dataSource = new MatTableDataSource(this.squadre) ;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
  
    });

    this.partiteService.findAll().subscribe(data => {
      this.partite = data;
 
        this.dataSource2 = this.partite ;
     
    });

    this.apiService.getStandingsNRL().subscribe(
      (response) => {
        
        console.log('API Response:', response);
        let cleanData = response.replace(/^\{|\}$/g, '').trim();
        this.standingsData = cleanData.split(','); 
      },
      (error) => {
        
        console.error('Error:', error);
      }
    );
    // this.fetchData();

    
    this.apiService.findAll().subscribe( (response) => {
      let cleanData = response.replace(/^\{|\}$/g, '').trim();
        this.standingsData = cleanData.split(','); 
      this.competitions = response;
     
        // this.dataSource2 = this.squadre ;
      
      // let roles: any[] = JSON.parse(localStorage.getItem('roles')!);
      // for (let role in roles) {
      //   console.log(roles[role].roleName);
        
      // }

    
        

      // }
    });
    
  }



    getPath(name: String): String {
      return "../../../assets/" + name + ".jpg";
      
      }

  // fetchData() {
  //   this.apiService.fetchTeamData().subscribe(
  //     (data) => {
  //       this.teamData = data; // Assign the fetched data to the component variable
  //       console.log('API Response:', data); // Optional: log the data to console
  //     },
  //     (error) => {
  //       this.errorMessage = error; // If an error occurs, show it
  //       console.error('Error:', error);
  //     }
  //   );
  // }

}






