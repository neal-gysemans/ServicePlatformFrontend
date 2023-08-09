import {Component, OnInit} from '@angular/core';
import {ApplicationServiceAndUserResponse} from "../../dto/ApplicationServiceAndUserResponse";
import {AdminService} from "../../services/admin.service";
import {HttpResponse} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UpdateServiceCommand} from "../../dto/UpdateServiceCommand";

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {
  services: ApplicationServiceAndUserResponse[] = [];

  // edit a service
  updateService = {} as UpdateServiceCommand;

  serviceForm: FormGroup;
  showModal!: boolean;


  constructor(private adminService: AdminService, private formBuilder: FormBuilder) {
    this.serviceForm = this.formBuilder.group({
      id: [-1],
      name: ['', Validators.required],
      cost: [0, Validators.min(0)],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.fetchServices();
  }

  // Function to fetch services data
  fetchServices(): void {
    this.adminService.getAllServices().subscribe((services) => {
      this.services = services.sort((a, b) => {
        return a.serviceProvider.name.localeCompare(b.serviceProvider.name);
      });
    });
  }

  deleteService(applicationServiceId: bigint): void {
    this.adminService.deleteUserService(applicationServiceId).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 200) {
          console.log('Service deleted successfully!');
          // You may want to update the services list after successful deletion
          this.fetchServices();
        } else {
          console.error('Failed to delete service.');
        }
      },
      (error) => {
        console.error('Failed to delete service.', error);
      }
    );
  }

  onSubmit() {
    this.updateService.id = this.serviceForm.value.id;
    this.updateService.name = this.serviceForm.value.name;
    this.updateService.cost = this.serviceForm.value.cost;
    this.updateService.description = this.serviceForm.value.description;

    // Store a reference to the old service before updating
    const oldService = this.services.find(service => service.id === this.updateService.id);

    // Call the service to edit the service
    this.adminService.editService(this.updateService).subscribe(
      (editedService) => {
        // Find the index of the updated service in the services array
        const index = this.services.findIndex(service => service.id === editedService.id);

        if (index !== -1) {
          // Update the services array with the edited service
          this.services[index] = editedService;
        }

        // Optionally, you can handle success cases here
      },
      (error) => {
        console.error('Failed to edit service:', error);
        // Revert to the old service in case of error
        if (oldService) {
          const index = this.services.findIndex(service => service.id === oldService.id);
          if (index !== -1) {
            this.services[index] = oldService;
          }
        }
        // Optionally, you can handle error cases here
      }
    );
    this.clearForm();
  }

  clearForm() {
    this.showModal = false;
    this.serviceForm.reset();
  }

  showEditServiceDialog(service: any) {
    this.serviceForm.setValue({
      id: service.id,
      name: service.name,
      cost: service.cost,
      description: service.description
    })
    this.showModal = true;
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
