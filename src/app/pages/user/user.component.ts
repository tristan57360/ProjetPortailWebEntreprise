import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  firstname: string;
  lastname: string;
  email: string;
  constructor() {
      this.firstname = 'Dany';
      this.lastname = 'Sanchez';
      this.email = 'sanchez4u@etu.univ-lorraine.fr';
  }

  ngOnInit() {
  }

}
