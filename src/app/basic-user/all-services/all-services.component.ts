import {Component, OnInit} from '@angular/core';
import {ApplicationServiceAndUserResponse} from "../../dto/ApplicationServiceAndUserResponse";
import {GuestService} from "../../services/guest.service";
import {BasicUserService} from "../../services/basic-user.service";
import {BookingReponse} from "../../dto/BookingReponse";

@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.css']
})
export class AllServicesComponent implements OnInit{
  services: ApplicationServiceAndUserResponse[] = [];

  first = 0;

  rows = 10;

  constructor(private userService: BasicUserService) {}

  ngOnInit() {
    this.userService.getAllServices().toPromise().then((services) => (this.services = services ?? []));
  }

  // Function to handle the booking action
  bookService(serviceId: number) {
    this.userService.createBooking(serviceId).subscribe(
      (response: BookingReponse) => {
        console.log('Booking successful:', response);
      },
      (error) => {
        console.error('Booking failed:', error);
      }
    );
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

  isLastPage(): boolean {
    return this.services ? this.first === this.services.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.services ? this.first === 0 : true;
  }
}
