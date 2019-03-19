// app.guard.ts

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';

@Injectable()
export class OktaAuthGuard implements CanActivate {
  oktaAuth;
  authenticated;
  constructor(private okta: OktaAuthService, private router: Router) {
    this.authenticated = okta.isAuthenticated();
    this.oktaAuth = okta;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticated) { return true; }

    // Redirect to login flow.
    this.oktaAuth.login();
    return false;
  }
}
