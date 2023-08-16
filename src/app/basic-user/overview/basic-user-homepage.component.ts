import {Component, OnInit} from '@angular/core';
import {ApplicationServiceAndUserResponse} from "../../dto/ApplicationServiceAndUserResponse";
import {BookingReponse} from "../../dto/BookingReponse";
import {BasicUserService} from "../basic-user.service";
import {AuthService} from "../../security/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-basic-user-homepage',
  templateUrl: './basic-user-homepage.component.html',
  styleUrls: ['./basic-user-homepage.component.css']
})
export class BasicUserHomepageComponent implements OnInit {
  services: ApplicationServiceAndUserResponse[] = [];
  bookings: BookingReponse[] = [];



  first = 0;

  rows = 10;

  constructor(private userService: BasicUserService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.fetchServices();
    this.fetchBookings();
  }

  fetchServices(): void {
    this.userService.getServices().subscribe((services) => {
      this.services = services;
    });
  }

  fetchBookings(): void {
    this.userService.getBookings().subscribe((bookings) => {
      this.bookings = bookings;
    });
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage()
    :
    boolean {
    return this.services ? this.first === this.services.length - this.rows : true;
  }

  isFirstPage()
    :
    boolean {
    return this.services ? this.first === 0 : true;
  }
}
