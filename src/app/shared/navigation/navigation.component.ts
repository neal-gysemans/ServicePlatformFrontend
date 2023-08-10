import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../security/auth.service";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  hamburgerOpen = false;

  items!: MenuItem[];

  isAdminUser: boolean = false;
  isBasicUser: boolean = false;
  userInfo: any = "";

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.userInfo = this.authService.getTokenInformation();
        this.isAdminUser = this.userInfo.role === 'ADMIN';
        this.isBasicUser = this.userInfo.role === 'USER';
        this.updateMenuItems();
      });
  }

  updateMenuItems(): void {
    this.items = [
      {
        label: 'Information',
        icon: 'pi pi-info-circle',
        command: () => {
          this.router.navigate(['']);
        }
      },
      {
        separator: true
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: () => {
          this.logout();
        }
      }
    ];

    if (this.isBasicUser) {
      this.items.splice(0, 0, {
        label: 'Account Overview',
        icon: 'pi pi-table',
        command: () => {
          this.router.navigate(['/basic_user']);
        }
      });
    }
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
}
