import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../security/auth.service";
import {Router} from "@angular/router";
import {ApplicationServiceAndUserResponse} from "../../dto/ApplicationServiceAndUserResponse";
import {AdminService} from "../../services/admin.service";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {
  services: ApplicationServiceAndUserResponse[] = [];

  constructor(private adminService: AdminService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.fetchServices();
  }

  // Function to fetch services data
  fetchServices(): void {
    this.adminService.getAllServices().subscribe((services) => {
      this.services = services.sort((a, b) => {
        return a.serviceProvider.name.localeCompare(b.serviceProvider.name);
      });
    });
  }

  deleteService(applicationServiceId: bigint): void {
    this.adminService.deleteUserService(applicationServiceId).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 200) {
          console.log('Service deleted successfully!');
          // You may want to update the services list after successful deletion
          this.fetchServices();
        } else {
          console.error('Failed to delete service.');
        }
      },
      (error) => {
        console.error('Failed to delete service.', error);
      }
    );
  }

  logout(): void {
    this.authService.logout(); // Call the logout method from AuthService
    this.router.navigate(["/login"]);
  }

  // Pagination logic (assuming you have already implemented the pagination methods)
  prev(): void {
    // Logic for moving to the previous page
  }

  next(): void {
    // Logic for moving to the next page
  }

  reset(): void {
    // Logic for resetting the pagination or other data
  }

  isFirstPage(): boolean {
    // Logic to check if it's the first page
    return false; // Replace with the appropriate logic
  }

  isLastPage(): boolean {
    // Logic to check if it's the last page
    return false; // Replace with the appropriate logic
  }

}
