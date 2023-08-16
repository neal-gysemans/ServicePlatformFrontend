import {Component, OnInit} from '@angular/core';
import {BookingReponse} from "../../dto/BookingReponse";
import {BasicUserService} from "../basic-user.service";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  bookings: BookingReponse[] = [];


  first = 0;

  rows = 10;

  constructor(private userService: BasicUserService,
              private confirmationService: ConfirmationService, private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    this.userService.getBookings().subscribe((bookings) => {
      this.bookings = bookings;
    });
  }

  confirm(booking: BookingReponse) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete <b>${booking.booked_service.name}</b>?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'info', summary: 'Deleted',
          detail: `You have deleted ${booking.booked_service.name}.`
        });
        this.deleteBooking(booking.id);
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: `You have rejected to delete ${booking.booked_service.name}.`
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled'});
            break;
        }
      }
    });
  }

  deleteBooking(id: bigint): void {
    this.userService.deleteBooking(id).subscribe(
      () => {
        this.fetchBookings();
      },
      (error) => {
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

  isLastPage()
    :
    boolean {
    return this.bookings ? this.first === this.bookings.length - this.rows : true;
  }

  isFirstPage()
    :
    boolean {
    return this.bookings ? this.first === 0 : true;
  }

}

