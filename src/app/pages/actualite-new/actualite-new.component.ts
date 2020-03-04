import { Component, OnInit } from '@angular/core';
import { ActualiteService } from 'src/app/service/actualite.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-actualite-new',
  templateUrl: './actualite-new.component.html',
  styleUrls: ['./actualite-new.component.scss']
})
export class ActualiteNewComponent implements OnInit {

  showAddMessage;

  constructor(private actualiteService: ActualiteService, private router: Router, private _snackBar: MatSnackBar) { }


  ngOnInit() {
    this.actualiteService.form.reset();
    this.showAddMessage=false;
  }

  openSnackBar(message: string,action :string) {
    this._snackBar.open(message,action, {
      duration: 2000,
    });
  }

  onSubmit() {
      let data = this.actualiteService.form.value;

      this.actualiteService.createActualite(data).then(res => {this.actualiteService.form.reset();
      this.openSnackBar('L\'actualité est enregistrée en base !','Succès !');

    }, err => {
      this.openSnackBar('L\'actualité n\'est pas enregistrée !','Echec !');
    });
  }

}
