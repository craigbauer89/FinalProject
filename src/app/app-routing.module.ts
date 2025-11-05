import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { UserGuard } from './auth/user.guard';
import { FormRegisterPartiteComponent } from './Components/form-register-partite/form-register-partite.component';
import { FormRegisterSquadreComponent } from './Components/form-register-squadre/form-register-squadre.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomePage } from './Pages/home/home.page';
import { LandingPage } from './Pages/landing/landing.page';
import { LoginPage } from './Pages/login/login.page';
import { PartitePage } from './Pages/partite/partite.page';
import { RegisterPage } from './Pages/register/register.page';
import { SquadreInfoPage } from './Pages/squadre-info/squadre-info.page';
import { SquadrePage } from './Pages/squadre/squadre.page';
import { StatistichePage } from './Pages/statistiche/statistiche.page';
import { TeamsComponent } from './teams/teams.component';
import { FormRegisterSeasonComponent } from './form-register-season/form-register-season.component';
import { FormRegisterChampionshipComponent } from './form-register-championship/form-register-championship.component';
import { FormRegisterClassificaComponent } from './form-register-classifica/form-register-classifica.component';
import { FormRegisterJerseyComponent } from './form-register-jersey/form-register-jersey.component';
import {StandingDetailsComponent} from './Components/standing-details/standing-details.component';
import { StandingDetails2Component } from './Components/standing-details2/standing-details2.component';
import { StandingDetails3Component } from './Components/standing-details3/standing-details3.component';
import { PartiteDetailsComponent } from './Components/partite-details/partite-details.component';
import { PartiteDetails2Component } from './Components/partite-details2/partite-details2.component';
import { PartiteDetails3Component } from './Components/partite-details3/partite-details3.component';
import { PlayersComponent } from './Pages/players/players.component';
import { FormRegisterChannelComponent } from './form-register-channel/form-register-channel.component';
import { FormRegisterPlayerComponent } from './form-register-player/form-register-player.component';
import { FormRegisterNewsComponent } from './form-register-news/form-register-news.component';
import { FormRegisterStadiumComponent } from './form-register-stadium/form-register-stadium.component';
import { StadiumComponent } from './Pages/stadium/stadium.component';
import { FormRegisterLaodIdComponent } from './form-register-laod-id/form-register-laod-id.component';

const routes: Routes = [

  {
    path: 'main',
    component: LandingPage,
  },
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'register',
    component: RegisterPage,
  },
  {
    path: 'calendario',
    component: PartitePage,
    canActivate:[UserGuard],
    children: [
      { path: ':season', 
        component: PartiteDetailsComponent ,
        children: [
         { path: ':date', 
          component: PartiteDetails2Component,
          children: [
            { path: ':group', 
             component: PartiteDetails3Component
            }
           ]
         }
        ]
      },
    ]
  },

  
    
    {
      path: 'classifica',
      component: SquadrePage,
      canActivate: [UserGuard],
      children: [
        { path: ':season', 
          component: StandingDetailsComponent ,
          children: [
           { path: ':league', 
            component: StandingDetails2Component,
            children: [
              { path: ':group', 
               component: StandingDetails3Component
              }
             ]
           }
          ]
        },
      //  { path: ':season/:league', component: StandingDetails2Component }

      ]
    },

  {
    path: 'squadreinfo',
    component: SquadreInfoPage,
    canActivate:[UserGuard] //, data:{roles:['ROLE_USER','ROLE_ADMIN']}
  },

  {
    path: 'playersinfo',
    component: PlayersComponent,
    canActivate:[UserGuard] //, data:{roles:['ROLE_USER','ROLE_ADMIN']}
  },

  {
    path: 'stadiumInfo',
    component: StadiumComponent,
    canActivate:[UserGuard] //, data:{roles:['ROLE_USER','ROLE_ADMIN']}
  },

  {
    path: 'statistiche',
    component: StatistichePage,
    canActivate:[UserGuard] //, data:{roles:['ROLE_USER','ROLE_ADMIN']}
  },

  {
    path: 'registersquadre',
    component: FormRegisterSquadreComponent,
    canActivate:[AuthGuard], data:{roles:['ROLE_ADMIN']}
  },

  {
    path: 'registerpartite',
    component: FormRegisterPartiteComponent,
    canActivate:[AuthGuard], data:{roles:['ROLE_ADMIN']}
  },

  {
    path: 'registerJersey',
    component: FormRegisterJerseyComponent,
    canActivate:[AuthGuard], data:{roles:['ROLE_ADMIN']}
  },

  {
    path: 'registerClassifica',
    component: FormRegisterClassificaComponent,
    canActivate:[AuthGuard], data:{roles:['ROLE_ADMIN']}
  },

  {
    path: 'registerChampionship',
    component: FormRegisterChampionshipComponent,
    canActivate:[AuthGuard], data:{roles:['ROLE_ADMIN']}
  },

  {
    path: 'registerPlayer',
    component: FormRegisterPlayerComponent,
    canActivate:[AuthGuard], data:{roles:['ROLE_ADMIN']}
  },
  {
    path: 'registerNews',
    component: FormRegisterNewsComponent,
    canActivate:[AuthGuard], data:{roles:['ROLE_ADMIN']}
  },
  {
    path: 'registerLoadIds',
    component: FormRegisterLaodIdComponent,
    canActivate:[AuthGuard], data:{roles:['ROLE_ADMIN']}
  },
  {
    path: 'registerChannel',
    component: FormRegisterChannelComponent,
    canActivate:[AuthGuard], data:{roles:['ROLE_ADMIN']}
  },
  {
    path: 'registerStadium',
    component: FormRegisterStadiumComponent,
    canActivate:[AuthGuard], data:{roles:['ROLE_ADMIN']}
  },

  {
    path: 'registerSeason',
    component: FormRegisterSeasonComponent,
    canActivate:[AuthGuard], data:{roles:['ROLE_ADMIN']}
  },


  
  {
    path: 'teams/:id',
    component: TeamsComponent,
    canActivate:[UserGuard],
    children: [
      { path: ':season', 
        component: StandingDetailsComponent ,
        children: [
         { path: ':league', 
          component: StandingDetails2Component,
          children: [
            { path: ':group', 
             component: StandingDetails3Component
            }
           ]
         }
        ]
      },
    //  { path: ':season/:league', component: StandingDetails2Component }

    ]
  },

  // {
  //   path: '**',
  //   component: NotFoundComponent
  // }

  { path: 'forbidden', component: ForbiddenComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
