import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class DocumentService {
  constructor(private firestore: AngularFirestore) {}

  createDocument(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("documents")
        .add(data)
        .then(
          res => {},
          err => reject(err)
        );
    });
  }

  getDocuments() {
    return this.firestore.collection('documents').snapshotChanges();
  }
}
