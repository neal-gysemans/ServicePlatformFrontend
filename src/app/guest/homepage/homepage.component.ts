import { Component } from '@angular/core';
import { ApplicationServiceAndUserResponse } from "../../dto/ApplicationServiceAndUserResponse";
import { GuestService } from "../guest.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  services: ApplicationServiceAndUserResponse[] = [];

  first = 0;

  rows = 10;

  constructor(private guestService: GuestService) {}

  ngOnInit() {
    this.guestService.getAllApplicationServices().toPromise().then((services) => (this.services = services ?? []));
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
