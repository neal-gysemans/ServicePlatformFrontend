import {Component, OnInit} from '@angular/core';
import {ApplicationServiceAndUserResponse} from "../../dto/ApplicationServiceAndUserResponse";
import {BookingReponse} from "../../dto/BookingReponse";
import {BasicUserService} from "../../services/basic-user.service";
import {AuthService} from "../../security/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  bookings: BookingReponse[] = [];

  constructor(private userService: BasicUserService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  // Function to fetch bookings data
  fetchBookings(): void {
    // Replace 'getBookings()' with the actual method in your service to get the bookings data
    this.userService.getBookings().subscribe((bookings) => {
      this.bookings = bookings;
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

