import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';
import { GoogleAuthProvider,TwitterAuthProvider, FacebookAuthProvider } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth:AngularFireAuth,private router:Router) { }

  login(email:string,password:string){
    this.fireAuth.signInWithEmailAndPassword(email,password).then(
      res =>{
        localStorage.setItem('token','true');

        if (res.user?.emailVerified == true) {
        this.router.navigate(['/dashboard']);
        } else {
        this.router.navigate(['/verify-email']);
        }
      },error=>{
        alert(error.message);
        this.router.navigate(['/connexion']);
      })
  }

  register(email:string,password:string){
    this.fireAuth.createUserWithEmailAndPassword(email,password).then(
      (res:any)=>{
        alert('inscription reussie');
        this.router.navigate(['/connexion']);
        this.sendEmailVerification(res.user);
    },error=>{
        alert(error.message);
        this.router.navigate(['/inscription'])
    })
  }

  logout(){
    this.fireAuth.signOut().then(
      ()=>{
        localStorage.removeItem('token');
        this.router.navigate(['/connexion']);
      },error=>{
        alert(error.message);
      }
    )
  }

  forgotPassword(email:string){
    this.fireAuth.sendPasswordResetEmail(email).then(
      ()=>{
        this.router.navigate(['/verify-email']);
      },error=>{
        alert(error);
      }
    )
  }

  sendEmailVerification(user:any){
    user.sendEmailVerification().then((res:any)=>{
      this.router.navigate(['/verify-email']);
    },(error:any)=>{
      alert('erreur dans l envoi du mail',);
    })
  }

  googleSignIn(){
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then(res=>{
      this.router.navigate(['/dashboard']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));
    },error=>{
      alert('error with google auth');
    });
  }

  facebookSignIn(){
    return this.fireAuth.signInWithPopup(new FacebookAuthProvider).then(res=>{
      this.router.navigate(['/dashboard']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));
    },err=>{
      alert('error with Facebook auth');
    });
  }

  twiterSignIn(){
    return this.fireAuth.signInWithPopup(new TwitterAuthProvider).then(res=>{
      this.router.navigate(['/dashboard']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));
    },err=>{
      alert(err);
    });
  }
}
