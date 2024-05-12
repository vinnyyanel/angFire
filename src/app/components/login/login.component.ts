import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

 protected email:string = '';
 protected password:string = '';

 constructor(private authService:AuthService){}

 login(){

  if (this.email=='') {
    alert('email manquant');
  }

  if (this.password=='') {
    alert('mot de passe manquant');
  }
  this.authService.login(this.email,this.password);
  this.email= '';
  this.password='';
 }

 signInWithGoogle(){
  this.authService.googleSignIn();
 }

 signInWithFacebook(){
  this.authService.facebookSignIn();
 }

 signInWithTwiter(){
  this.authService.twiterSignIn();
 }
}
