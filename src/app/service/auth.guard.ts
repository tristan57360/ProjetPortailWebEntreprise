import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    if (this.checkLogin(url)) {
      const roles = next.data.roles as Array<string>;
      if (roles !== null && roles !== undefined) {
        if (roles.length === 0) {
          return true;
        } else {
          let haveARoleInArray = false;
          roles.forEach(role => {
            if (this.authService.isRole(role)) {
              haveARoleInArray = true;
            }
          });
          if (haveARoleInArray) {
            return true;
          }
          return false;
        }
      }
      return true;
    }
    return false;
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { return true; }
    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}
