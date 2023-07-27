import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../security/auth.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  hamburgerOpen = false;
  isAdminUser: boolean = false;
  isBasicUser: boolean = false;
  userRole: string = "";

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.userRole = this.authService.getUserRoleFromStorage();
        this.isAdminUser = this.userRole === 'ADMIN';
        this.isBasicUser = this.userRole === 'USER';
      });
  }


  toggleHamburger(): void {
    this.hamburgerOpen = !this.hamburgerOpen;
  }

  onHamburgerItemClick() {
    if (this.hamburgerOpen) {
      this.hamburgerOpen = false;
    }
  }

  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.isBasicUser = false;
    this.isAdminUser = false;
    this.authService.logout(); // Call the logout method from AuthService
    this.router.navigate(["/login"]);
  }

  navigateTo(path: string) {
    this.hamburgerOpen = false;
  }
}
