import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule, } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SquadrePage } from './Pages/squadre/squadre.page';
import { FormRegisterSquadreComponent } from './Components/form-register-squadre/form-register-squadre.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormRegisterPartiteComponent } from './Components/form-register-partite/form-register-partite.component';
import { PartitePage } from './Pages/partite/partite.page';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import { LoginPage } from './Pages/login/login.page';
import { BasicAuthInterceptorServiceService } from './Services/basic-auth-interceptor-service.service';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from './Services/user.service';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { RegisterPage } from './Pages/register/register.page';
import { HomePage } from './Pages/home/home.page';
import { SquadreInfoPage } from './Pages/squadre-info/squadre-info.page';

@NgModule({
  declarations: [
    AppComponent,
    SquadrePage,
    FormRegisterSquadreComponent,
    FormRegisterPartiteComponent,
    PartitePage,
    LoginPage,
    HeaderComponent,
    ForbiddenComponent,
    RegisterPage,
    HomePage,
    SquadreInfoPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatSortModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,

    
    
  
  ],
  providers: [
    AuthGuard,
    {
    
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor ,
    multi: true
  }, UserService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
