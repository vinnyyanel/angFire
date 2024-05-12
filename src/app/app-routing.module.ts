import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyMailComponent } from './components/verify-mail/verify-mail.component';
import { AngularFireAuthGuard,redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['connexion']);
const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'connexion'
  },
  {
    path:'connexion',
    component:LoginComponent,
  },
  {
    path:'inscription',
    component:RegisterComponent,
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path:'forgot-password',
    component:ForgotPasswordComponent
  }
  ,
  {
    path:'verify-email',
    component:VerifyMailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
