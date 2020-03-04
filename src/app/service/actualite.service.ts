import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Actualite } from '../model/actualite';
import { resolve } from 'url';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ActualiteService {
   constructor(private afs: AngularFirestore) {
   }

   form = new FormGroup({
     titre: new FormControl(''),
     html: new FormControl(''),
     date: new FormControl(null)
   });

  getActualites() {
    return this.afs.collection<Actualite>('actualites').snapshotChanges();
  }

  createActualite(data) {
    if(data.date){
      data.date = new Date(data.date);
    }
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('actualites').add(data).then(res => {resolve(res)}, err => reject(err));
    });
  }

  updateActualite(data) {
    return this.afs.collection('actualites').doc(data.payload.doc.id).set({completed: true}, {merge: true});
  }

  deleteActualite(data) {
    return this.afs.collection('actualites').doc(data.payload.doc.id).delete();
  }
}
