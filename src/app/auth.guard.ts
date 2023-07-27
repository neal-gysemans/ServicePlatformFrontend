import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "./security/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const requiredRole = next.data['role'];

    if (!this.authService.isLoggedIn()) {
      // If the user is not logged in, redirect to the guest page
      this.router.navigate(['/guest']);
      return false;
    }

    const userRole = this.authService.getUserRoleFromStorage();
    if (userRole === requiredRole) {
      // Allow access if the user has the required role or is an admin
      return true;
    } else {
      // Redirect to an unauthorized page or display an error message
      this.router.navigate(['/unauthorized']); // Replace '/unauthorized' with the path to your unauthorized page or component
      return false;
    }
  }
}
