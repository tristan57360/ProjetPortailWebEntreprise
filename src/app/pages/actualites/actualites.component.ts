import { Component, OnInit } from '@angular/core';
import { ActualiteService } from 'src/app/service/actualite.service';

import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-actualites',
  templateUrl: './actualites.component.html',
  styleUrls: ['./actualites.component.scss']
})
export class ActualitesComponent implements OnInit {
  actualitesList;
  isAdmin;
  getActualites = () => {
    this.actualiteService
      .getActualites()
      .subscribe(
        res =>
          (this.actualitesList = res.sort(
            (a, b) =>
              b.payload.doc.data().date.seconds -
              a.payload.doc.data().date.seconds
          ))
      );
  }

  constructor(
    private actualiteService: ActualiteService,
    private authService: AuthService
  ) {
    this.isAdmin = this.authService.isAdmin;
  }

  ngOnInit() {
    this.getActualites();
  }
}
