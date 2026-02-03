import { Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoadIds } from 'src/app/Interfaces/LoadIds';
import { News } from 'src/app/Interfaces/news';
import { Partite } from 'src/app/Interfaces/partite';
import { Picture } from 'src/app/Interfaces/picture';
import { Squadre } from 'src/app/Interfaces/squadre';
import { AuthService } from 'src/app/Services/auth.service';
import { LoadIdsService } from 'src/app/Services/loadIds.service';
import { NewsService } from 'src/app/Services/news.service';
import { PartiteService } from 'src/app/Services/partite.service';
import { PictureService } from 'src/app/Services/picture.service';
import { SquadraServiceService } from 'src/app/Services/squadra-service.service';
import { UserService } from 'src/app/Services/user.service';
import { ApiService } from 'src/app/api.service';


@Component({
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss']
})


export class LandingPage implements OnInit {


  @ViewChild('f') form!: NgForm;
  sort!: MatSort;
  element: any;
  hideForResponsive = false;
  hideForResponsivePhone = false;
  currentId = 0;
  partite: Partite[] = [];
  squadraFixtures: Partite[] = [];
  news: News[] = [];
  squadre: Squadre[] = [];
  displayedColumns: string[] = [ 'img', 'nome', 'punti', 'differenza' ];
  dataSource = new MatTableDataSource(this.squadre) ;
  fixturesDataSource = new MatTableDataSource(this.squadraFixtures) ;
  //displayedColumns2: string[] = ['date','img1', 'puntisquadra1', 'dash',  'puntisquadra2', 'img2' ];
  displayedColumns2: string[] = ['img1', 'dash', 'img2' ];
  //displayedColumns3: string[] = ['date','img1',  'dash', 'img2','stadium','tickets','channel' ];
  displayedColumns3: string[] = ['img1',  'dash', 'img2' ];


  dataSource2: Partite[] = [];
  standingsData: any; 
  teamData: any = null;
  errorMessage: string = '';
  competitions: any;
  inputNumero: number | undefined;
  classificaId: number = 241;
  areYouSure = false;
  calendariobox = true;
  resultsbox = false;
  modifybox = false;
  error = undefined;
  picture: Picture [] = [];
  loadIds: LoadIds [] = [];
  loadId: LoadIds | undefined;

  NewsModifyFormGroup = this._form.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      picture: [null as Picture | null, Validators.required],
  });

  newsData:any ={
    id: '',
    title: '',
    content: '',
    picture: '',
  }

  constructor(private loadIdsService: LoadIdsService, private pictureService: PictureService,private _form: FormBuilder,private authService: AuthService,public userService: UserService,private newsService: NewsService, private apiService: ApiService, private squadraServiceService: SquadraServiceService,private partiteService: PartiteService) { }
 
  ngOnInit()  {

    this.loadIdsService.findAll().subscribe( data => {
      this.loadIds = data;
      this.loadId = this.loadIds[0];
      this.classificaId = this.loadId.classifica_id;
      console.log(data);
    
      this.newsService.findAll().subscribe(data =>  {
          this.news = data;
        });

      this.squadraServiceService.getByClassificaId(this.classificaId).subscribe(data => {
        this.squadre = data;
        this.dataSource = new MatTableDataSource(this.squadre) ;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
      });

      this.partiteService.findAllByClassifica(this.classificaId).subscribe(data => {
        // this.partite = data;
        //this.dataSource2 = this.partite ;
        const oggi = new Date();
        const now = new Date();
const setDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
       // const setDate = new Date("2022-11-13");
      //  const newdate2 = new Date(data[1].date);

  
        this.dataSource2 = data.filter((partita: Partite) => {
          return new Date(partita.date) <= setDate;
        });
        //this.dataSourceResults.data = this.squadraPartite;
  
        this.squadraFixtures = data.filter((partita: Partite) => {
          return new Date(partita.date) > setDate;
        });
        this.fixturesDataSource.data = this.squadraFixtures;
      });

      this.pictureService.findAll().subscribe( data => {
        this.picture = data;
        console.log(data);
      });

    });
      // this.apiService.getStandingsNRL().subscribe(
      //   (response) => {
      //     console.log('API Response:', response);
      //     let cleanData = response.replace(/^\{|\}$/g, '').trim();
      //     this.standingsData = cleanData.split(','); 
      //   },
      //   (error) => {
      //     console.error('Error:', error);
      //   }
      // );
      // this.apiService.findAll().subscribe( (response) => {
      //   let cleanData = response.replace(/^\{|\}$/g, '').trim();
      //     this.standingsData = cleanData.split(','); 
      //   this.competitions = response;
      // });
  }

  submitForm() {
    if (this.inputNumero !== undefined) {
      this.classificaId = this.inputNumero;

      this.squadraServiceService.getByClassificaId(this.classificaId).subscribe(data => {
        this.squadre = data;
        this.dataSource = new MatTableDataSource(this.squadre) ;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);

        this.partiteService.findAllByClassifica(this.classificaId).subscribe(data => {
          // this.partite = data;
          //  this.dataSource2 = this.partite ;
          const oggi = new Date();
          const setDate = new Date("2026-11-13"); //THis needs to ne mangerd
          this.dataSource2 = data.filter((partita: Partite) => {
            return new Date(partita.date) <= setDate;
          });
          // this.dataSourceResults.data = this.squadraPartite;
          this.squadraFixtures = data.filter((partita: Partite) => {
            return new Date(partita.date) > setDate;
          });
          this.fixturesDataSource.data = this.squadraFixtures;
        });
      });

      console.log('classificaId:', this.classificaId);
    } else {
      console.error('inputNumero è undefined');
    }
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

  modifyNews(id:number) {
    this.topFunction();
    this.modifybox = true;
    this.currentId = id;
  
    this.newsService.findById(this.currentId).subscribe(data => 
      this.newsData = data
      );
   }

   topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  cancella(id:number) {
    this.topFunction();
    this.currentId = id;
    this.areYouSure = true;
  
    this.newsService.findById(this.currentId).subscribe(data => 
      this.newsData = data
      );
  }

  isAdmin() {
  
    let isAdmin = null;
    let roles: any[] = this.authService.getRoles();
    for (let role in roles) {
      if (((roles[role].roleName)) === 'ROLE_USER'){
        isAdmin = 'hidden-row';
      }
    }
    return isAdmin;
    
  }
  
  close() {
    this.modifybox = false;
    this.areYouSure = false;
  }

  modify() { 
    this.newsService.modifyNews(this.currentId, this.form.value)
    .subscribe(data => console.log(data));

    window.alert("Player Modificato")
    this.modifybox = false;
    this.ngOnInit();
  }

  cancellaNews() {

    this.newsService.cancellaNews(this.currentId).subscribe(data => console.log(data));
    window.alert("News Cancellato");
    this.areYouSure = false;
    this.ngOnInit();
  
  }

  fixUrl(url: string): string {
    if (!url) return '#'; // evita errori
    if (!/^https?:\/\//i.test(url)) {
      return 'https://' + url;  // aggiunge https se manca
    }
    return url;
  }

  clickCalender(){

    this.calendariobox = true;
    this.resultsbox = false;
  }

   clickResults(){
    this.resultsbox = true;
    this.calendariobox = false;
  }
  

}