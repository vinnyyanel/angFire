import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  protected email:string = '';
  protected password:string = '';

  constructor(private authService:AuthService){}

  register(){

   if (this.email=='') {
     alert('email manquant');
   }

   if (this.password=='') {
     alert('mot de passe manquant');
   }
   this.authService.register(this.email,this.password);
   this.email= '';
   this.password='';
  }

}
