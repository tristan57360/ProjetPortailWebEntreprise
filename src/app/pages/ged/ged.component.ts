import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { DocumentService } from 'src/app/service/document.service';
import { AuthService } from 'src/app/service/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ged',
  templateUrl: './ged.component.html',
  styleUrls: ['./ged.component.scss']
})
export class GEDComponent implements OnInit {
  docList;
  isAuthorized;
  formGroup: FormGroup;

  constructor(
    private afStorage: AngularFireStorage,
    private documentService: DocumentService,
    private authService: AuthService
  ) {
    this.isAuthorized = false;
    if (this.authService.isAdmin || this.authService.isEmployed) {
      this.isAuthorized = true;
    }
    this.formGroup = new FormGroup({
      file: new FormControl('')
    });
  }

  ngOnInit() {
    this.getDocuments();
  }

  getDocuments = () =>
    this.documentService.getDocuments().subscribe(res => (this.docList = res))

  upload(event) {
    let docName;
    const file = event.target.files[0];
    this.afStorage.upload('/files/' + file.name, file).then(res => {
      docName = res.ref.name;
      res.ref.getDownloadURL().then(url => {
        this.documentService.createDocument({ name: docName, downloadUrl: url });
        this.formGroup.reset();
      });
    });
  }
}
