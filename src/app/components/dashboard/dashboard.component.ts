import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  protected users:User[]= [];
  protected userI:User ={
    id:'',
    nom:'',
    prenom:'',
    email:'',
    mobile:''
  };

  constructor(private authService:AuthService,private data : DataService){}
  logout(){
    this.authService.logout();
  }

  getAllUser(){
    this.data.getAllUser().subscribe({
      next:(res:any)=>{
      this.users = res.map((e:any)=>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    },
    error:(error)=>{
      alert('error lors de la recuperation des utilisateurs');
    }})
  }

  resetForm(){
    
  }

  addUser(){
    if (this.userI.nom == '' || this.userI.prenom == '' ||this.userI.mobile == '' || this.userI.email == '') {
        alert('veillez remplir tous les champs');
    }

    this.data.addUser(this.userI);
    this.resetForm();
  }

  deleteUser(user:User){
    if (window.confirm('etes vous sur de supprimer'+user.nom+''+user.prenom)) {
      this.data.deleteUser(user);
    }
  }
}
