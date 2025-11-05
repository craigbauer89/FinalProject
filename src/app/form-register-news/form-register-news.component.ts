import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SquadraServiceService } from '../Services/squadra-service.service';
import { JerseyService } from '../Services/jersey.service';
import { NewsService } from '../Services/news.service';
import { UserService } from '../Services/user.service';
import { News } from '../Interfaces/news';
import { Picture } from '../Interfaces/picture';
import { PictureService} from '../Services/picture.service';



@Component({
  selector: 'app-form-register-news',
  templateUrl: './form-register-news.component.html',
  styleUrls: ['./form-register-news.component.scss']
})
export class FormRegisterNewsComponent implements OnInit {

   @ViewChild('f') form!: NgForm;
    hide = true;
    checked = false;
    indeterminate = false;
    labelPosition: 'before' | 'after' = 'after';
    disabled = false;
    error = undefined;
    picture: Picture [] = [];
    news: News[] = [];
    dataSourceClassifica = this.news;
   
  
  
  
    NewsRegisterFormGroup = this._form.group({
        title: ['', Validators.required],
        content: ['', Validators.required],
        picture: [null as Picture | null, Validators.required],
        });

  constructor(private pictureService: PictureService, private newsService: NewsService, private route: ActivatedRoute, private SquadreServiceservice: SquadraServiceService,private router: Router,
    private _form: FormBuilder, private responsive: BreakpointObserver, private jerseyService: JerseyService, public userService: UserService) { 

      // this.squadra = new Squadre();
    }

  ngOnInit(): void {

    this.pictureService.findAll().subscribe( data => {
     this.picture = data;
     console.log(data);
     });

  }

  onSubmit() {


      this.newsService.addNews(this.form.value).subscribe(
        resp => {

          window.alert("News aggiunta");
          this.error = undefined;

        },
        err  => {
          console.log(err.error);
          window.alert("News gia inserito hello");
          this.error = err.error;
        }
      )
  
    }

}
