import {Component, OnInit} from '@angular/core';
import {ApplicationServiceAndUserResponse} from "../../dto/ApplicationServiceAndUserResponse";
import {BasicUserService} from "../../services/basic-user.service";
import {NewBookingCommand} from "../../dto/NewBookingCommand";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";

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

  first = 0;

  rows = 10;

  constructor(private userService: BasicUserService, private messageService: MessageService) {
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

    // Call the service to create the new booking
    this.userService.createBooking(this.newBookingCommand).subscribe(
      () => {
        this.messageService.add({severity: 'info', summary: 'Booking created'});

      },
      () => {
        this.messageService.add({severity: 'error', summary: 'Failed to create booking'});
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
