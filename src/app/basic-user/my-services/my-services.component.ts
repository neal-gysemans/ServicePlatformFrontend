import {Component, OnInit} from '@angular/core';
import {ApplicationServiceAndUserResponse} from "../../dto/ApplicationServiceAndUserResponse";
import {BookingReponse} from "../../dto/BookingReponse";
import {BasicUserService} from "../../services/basic-user.service";
import {AuthService} from "../../security/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.css']
})
export class MyServicesComponent implements OnInit {
  services: ApplicationServiceAndUserResponse[] = [];

  constructor(private userService: BasicUserService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.fetchServices();
  }

  // Function to fetch services data
  fetchServices(): void {
    // Replace 'getServices()' with the actual method in your service to get the services data
    this.userService.getServices().subscribe((services) => {
      this.services = services;
    });
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
