import { Component, OnInit } from '@angular/core';
import { ActualiteService } from 'src/app/service/actualite.service';

@Component({
  selector: 'app-actualites',
  templateUrl: './actualites.component.html',
  styleUrls: ['./actualites.component.scss']
})
export class ActualitesComponent implements OnInit {
  actualitesList;

  getActualites = () => {
    this.actualiteService.getActualites().subscribe(res => (this.actualitesList = res));
  }

  constructor(private actualiteService: ActualiteService) { }

  ngOnInit() {
    this.getActualites();
  }

}
