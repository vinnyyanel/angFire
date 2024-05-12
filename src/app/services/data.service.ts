import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs:AngularFirestore) { }

  addUser(user:User){
    user.id = this.afs.createId();
    return  this.afs.collection('/Users').add(user);
  }

  getAllUser(){
   return this.afs.collection('/Users').snapshotChanges();
  }

  deleteUser(user:User){
    return this.afs.doc('/Users'+user.id).delete();
  }

  updateUser(user:User){
    this.deleteUser(user);
    this.addUser(user);
  }
}
