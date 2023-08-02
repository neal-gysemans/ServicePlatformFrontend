import {Component, OnInit} from '@angular/core';
import {ApplicationServiceAndUserResponse} from "../../dto/ApplicationServiceAndUserResponse";
import {NewApplicationServiceCommand} from "../../dto/NewApplicationServiceCommand";
import {BasicUserService} from "../../services/basic-user.service";
import {AuthService} from "../../security/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.css']
})
export class MyServicesComponent implements OnInit {
  services: ApplicationServiceAndUserResponse[] = [];

  newServiceForm: FormGroup;
  newService: NewApplicationServiceCommand = {
    name: '',
    description: '',
    cost: ''
  };

  constructor(private userService: BasicUserService, private authService: AuthService, private router: Router,
              private formBuilder: FormBuilder) {
    this.newServiceForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      cost: ['', Validators.required]
    });
  }

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

  onSubmit(): void {
    console.log('I submit');
    if (this.newServiceForm.valid) {
      // Assign the form values to the newService object
      this.newService = {
        name: this.newServiceForm.get('name')?.value,
        description: this.newServiceForm.get('description')?.value,
        cost: this.newServiceForm.get('cost')?.value
      };

      // Call the service to create the new service
      this.userService.createService(this.newService).subscribe(
        (createdService) => {
          console.log('Service created successfully:', createdService);
          // Optionally, you can handle success cases here
        },
        (error) => {
          console.error('Failed to create service:', error);
          // Optionally, you can handle error cases here
        }
      );

      // Reset the form or perform any other actions after submitting
      this.newServiceForm.reset();
    }
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
