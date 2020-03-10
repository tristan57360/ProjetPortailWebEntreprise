import { Injectable } from '@angular/core';
import { User } from './../model/user';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private afs: AngularFirestore) {
   }

   form = new FormGroup({
    lastname: new FormControl(''),
    firstname: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    photo: new FormControl(''),
    equipe: new FormControl(''),
    numero: new FormControl(''),
  });

  updateUser(data) {
    return this.afs
      .collection('users')
      .doc(data.payload.doc.id)
      .set({ completed: true }, { merge: true });
  }

  updateUserById(id,data) {
    return this.afs
      .collection('users')
      .doc(id)
      .set(data , { merge: true });
  }

  deleteUser(data) {
    return this.afs
      .collection('users')
      .doc(data.payload.doc.id)
      .delete();
  }

  getUsers() {
    return this.afs.collection('users').snapshotChanges();
  }
}
