import { Injectable } from '@angular/core';
import { User } from './../model/user';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private afs: AngularFirestore) {
   }

  getUsers() {
    return this.afs.collection('users').snapshotChanges();
  }
}
