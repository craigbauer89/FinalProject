import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SquadraServiceService } from '../Services/squadra-service.service';
import { JerseyService } from '../Services/jersey.service';
import { UserService } from '../Services/user.service';
import { News } from '../Interfaces/news';
import { Channel } from '../Interfaces/channel';
import { ChannelService } from '../Services/channel.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-form-register-channel',
  templateUrl: './form-register-channel.component.html',
  styleUrls: ['./form-register-channel.component.scss']
})
export class FormRegisterChannelComponent implements OnInit {

   @ViewChild('f') form!: NgForm;
   @ViewChild('f2') form2!: NgForm;
      hide = true;
      checked = false;
      indeterminate = false;
      labelPosition: 'before' | 'after' = 'after';
      disabled = false;
      error = undefined;
      picture: String [] = [];
      channel: Channel | undefined;
      activeChannelId:any;
      channels: Channel[] = [];
      areYouSure = false;
      modifybox = false;
      currentId = 0;
      searchText: any;
      page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [3, 6, 9, 12];

      channelData:any ={
        id: '',
    name: '',
    country: '',
    free: '',
 
      }
     
      ChannelRegisterFormGroup = this._form.group({
          name: ['', Validators.required],
          country: ['', Validators.required],
          free: ['', Validators.required],
          });

        ChannelModifyFormGroup = this._form2.group({
          name: ['', Validators.required],
          country: ['', Validators.required],
          free: ['', Validators.required],
          });

  constructor(private authService: AuthService,private channelService: ChannelService, private route: ActivatedRoute, private SquadreServiceservice: SquadraServiceService,private router: Router,
    private _form: FormBuilder, private _form2: FormBuilder,private responsive: BreakpointObserver, private jerseyService: JerseyService, public userService: UserService) { 

      // this.squadra = new Squadre();
    }

  ngOnInit(): void {

    this.channelService.findAll().subscribe(data => {
      this.channels = data;
      console.log(this.channels);

    });
  }

  onSubmit() {

    this.channelService.addChannel(this.form.value).subscribe(
      resp => {

        window.alert("Channel aggiunta");
        this.error = undefined;

      },
      err  => {
        console.log(err.error);
        window.alert("Channel gia inserito hello");
        this.error = err.error;
      }
    )

  }

  // isActiveChannel(id: number): boolean {
  //   return this.activeChannelId === id; 
  // }

  // selectChannel(id: number): void {
  //   this.activeChannelId = id; 
  //   this.channelService.findById(id).subscribe(data => {
  //     this.channel = data;
  //   //  this.dataSourceChampionship = this.championships ;

  //   });

  // }

  modifyChannel(id:number) {
    this.modifybox = true;
    this.currentId = id;
  
    this.channelService.findById(this.currentId).subscribe(data => 
      this.channelData = data
      );
  
   
   }
  
   modify() {

    this.channelService.modifyChannel(this.currentId, this.form2.value)
      .subscribe(data => console.log(data));
      window.alert("Channel Modificato")
      this.modifybox = false;
      this.ngOnInit();
  }


cancella(id:number) {
  this.currentId = id;
  this.areYouSure = true;

  this.channelService.findById(this.currentId).subscribe(data => 
    this.channelData = data
    );
}

cancellaChannel() {

  this.channelService.cancellaChannel(this.currentId)
.subscribe(data => console.log(data));
  window.alert("Channel Cancellato");


this.areYouSure = false;
this.ngOnInit();

}

close() {
  
  this.modifybox = false;
  this.areYouSure = false;

}

isAdmin() {
  
  let isAdmin = null;
  let roles: any[] = this.authService.getRoles();
  for (let role in roles) {
    if (((roles[role].roleName)) === 'ROLE_USER'){
      isAdmin = 'hidden-row';
      
      
    }
    // else {
    //   isAdmin  = 'hidden-row'
    // }
    
  }
  return isAdmin;
  
}

getSite(name: String): String {
  
  return  name;
  
  
  }


  onTableDataChange(event: any) {
    this.page = event;
    this.ngOnInit();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.ngOnInit();
  }

}
