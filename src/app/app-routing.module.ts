import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { FormRegisterPartiteComponent } from './Components/form-register-partite/form-register-partite.component';
import { FormRegisterSquadreComponent } from './Components/form-register-squadre/form-register-squadre.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginPage } from './Pages/login/login.page';
import { PartitePage } from './Pages/partite/partite.page';
import { RegisterPage } from './Pages/register/register.page';
import { SquadrePage } from './Pages/squadre/squadre.page';


const routes: Routes = [

  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'register',
    component: RegisterPage,
  },
  {
    path: 'partite',
    component: PartitePage,
    canActivate:[AuthGuard]
  },
  
  {
    path: 'squadre',
    component: SquadrePage,
    canActivate:[AuthGuard]
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

  { path: 'forbidden', component: ForbiddenComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
