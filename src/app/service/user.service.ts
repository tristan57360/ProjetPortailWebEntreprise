import { Injectable } from '@angular/core';
import { User } from './../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUsers(): User[] {
    return [{email: 'M.b@gmail.com',
    firstname: 'Marion',
    lastname: 'Brouillard',
    photo: '../assets/Lucy.png',
    role: 'Admin'},
    {email: 'T.p@gmail.com',
    firstname: 'Tristan',
    lastname: 'Pasqualotto',
    photo: '../assets/Natsu.png',
    role: 'Admin'}];
  }
}
