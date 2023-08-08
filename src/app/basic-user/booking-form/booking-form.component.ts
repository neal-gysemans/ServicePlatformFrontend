import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent {
  @Output() bookingConfirmed = new EventEmitter<any>();

  bookingForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.bookingForm = this.formBuilder.group({
      notes: [''],
      date_time: ['', Validators.required]
    });
  }

  confirmBooking() {
    if (this.bookingForm.valid) {
      console.log("confirm pressed")
      this.bookingConfirmed.emit(this.bookingForm.value);
    }
  }
}
