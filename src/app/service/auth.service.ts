import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { User as UserData } from '../model/user';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: User;
  userData: UserData;
  redirectUrl: string;

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.afs
        .collection('users')
        .doc(user.uid)
        .snapshotChanges().subscribe(res => {
          if (res) {
            const userData = res.payload.data() as UserData;
            localStorage.setItem('userData', JSON.stringify(userData));
          } else {
            localStorage.setItem('userData', null);
          }
        });
      } else {
        localStorage.setItem('user', null);
        localStorage.setItem('userData', null);
      }
    });
  }

  async SignIn(email: string, password: string) {
    await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    if (this.isLoggedIn) {
      const redirect = this.redirectUrl ? this.router.parseUrl(this.redirectUrl) : '/dashboard';
      this.router.navigateByUrl(redirect);
    }
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  async SignOut() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  isRole(role: String): boolean {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData !== null && userData.role === role;
  }

  get isAdmin(): boolean {
    return this.isRole('admin');
  }

  get isEmployed(): boolean {
    return this.isRole('employed');
  }

  get dataOfUser(): UserData {
    return JSON.parse(localStorage.getItem('userData'));
  }
}


