import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: User;
  redirectUrl: string;

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
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

  async register(email: string, password: string, firstname: string, lastname: string) {
    await new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(userData => {
        this.afs.collection('users').doc(userData.user.uid).set({
          firstname: firstname,
          lastname: lastname
        })
        this.router.navigateByUrl('/login');
      },
      err => reject(err))
    });
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

}

