import { Component, OnInit } from '@angular/core';
import { UserService } from './../../service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userList;

  getUsers = () => {
    this.userService.getUsers().subscribe(res => (this.userList = res));
  }

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

}
