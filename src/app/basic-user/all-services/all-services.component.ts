import {Component, OnInit} from '@angular/core';
import {ApplicationServiceAndUserResponse} from "../../dto/ApplicationServiceAndUserResponse";
import {BasicUserService} from "../../services/basic-user.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {NewBookingCommand} from "../../dto/NewBookingCommand";
import {BookingFormComponent} from "../booking-form/booking-form.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.css']
})
export class AllServicesComponent implements OnInit {
  services: ApplicationServiceAndUserResponse[] = [];

  serviceInfo = {
    name: '',
    serviceProvider: '',
    cost: ''
  };

  showModal!: boolean;
  // Variables to store user input
  newBooking: FormGroup;

  newBookingCommand = {} as NewBookingCommand;


  dialogRef: DynamicDialogRef | null = null;

  first = 0;

  rows = 10;

  constructor(private userService: BasicUserService) {
    this.newBooking = new FormGroup({
        notes: new FormControl('', [Validators.maxLength(500)]),
        date_time: new FormControl(new Date())
    })
  }

  ngOnInit() {
    this.userService.getAllServices().toPromise().then((services) => (this.services = services ?? []));
  }

  onSubmit() {
    this.newBookingCommand.notes = this.newBooking.value.notes;
    this.newBookingCommand.date_time = this.newBooking.value.date_time;

    console.log("the dto that i send:)", this.newBookingCommand);

    // Call the service to create the new booking
    this.userService.createBooking(this.newBookingCommand).subscribe(
      (createdBooking) => {
        console.log('Booking created successfully:', createdBooking);
        // Optionally, you can handle success cases here
      },
      (error) => {
        console.error('Failed to create service:', error);
        // Optionally, you can handle error cases here
      }
    );
    this.clearForm();
  }

  clearForm() {
    this.newBookingCommand = {} as NewBookingCommand;
    this.showModal = false;
    this.newBooking.reset();
  }

  showDialog(service: any) {
    this.newBookingCommand.booked_service_id = service.id;
    this.serviceInfo.name = service.name;
    this.serviceInfo.serviceProvider = service.serviceProvider.name;
    this.serviceInfo.cost = service.cost;

    this.showModal = true;
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
