import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/components/login/login.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loginService.loggedIn()) {
      if (state.url.includes("login") || state.url.includes("register")) {
        this.router.navigate(['/dashboard']);
        return false;
      } else {
        return true;
      }
    } else {
      if (state.url.includes("login") || state.url.includes("register")) {
        return true;
      } else {
        return false;
      }
    }
  }

}
