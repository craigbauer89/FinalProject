import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRegisterPartiteComponent } from './Components/form-register-partite/form-register-partite.component';
import { FormRegisterSquadreComponent } from './Components/form-register-squadre/form-register-squadre.component';
import { SquadrePage } from './Pages/squadre/squadre.page';

const routes: Routes = [


  
  {
    path: 'squadre',
    component: SquadrePage,
  },

  {
    path: 'registersquadre',
    component: FormRegisterSquadreComponent,
  },

  {
    path: 'registerpartite',
    component: FormRegisterPartiteComponent,
  },

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
