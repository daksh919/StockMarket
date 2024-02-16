// redirect.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Navigation } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.isNavigationByUser()) {
        if (state.url !== '/') {
          this.router.navigate(['/']);
        }
        return false;
      }
      return true;
  }

  private isNavigationByUser(): boolean {
    const navigation = this.router.getCurrentNavigation();
    return !!navigation && !!navigation.previousNavigation;
  }
}
