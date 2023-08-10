import {Component, OnInit} from '@angular/core';
import {ApplicationServiceAndUserResponse} from "../../dto/ApplicationServiceAndUserResponse";
import {BasicUserService} from "../../services/basic-user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpResponse} from "@angular/common/http";
import {UpdateServiceCommand} from "../../dto/UpdateServiceCommand";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.css']
})
export class MyServicesComponent implements OnInit {
  services: ApplicationServiceAndUserResponse[] = [];

  // modal for creation
  newServiceForm: FormGroup;
  newService = {} as UpdateServiceCommand;
  showModal1!: boolean;

  // modal for editing
  editServiceForm: FormGroup;
  updatedService = {} as UpdateServiceCommand;
  showModal2!: boolean;


  first = 0;

  rows = 10;


  constructor(private userService: BasicUserService, private formBuilder: FormBuilder,
              private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.newServiceForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      cost: ['', Validators.required]
    });
    this.editServiceForm = this.formBuilder.group({
      id: [-1],
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

  confirm(applicationService: ApplicationServiceAndUserResponse) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete <b>${applicationService.name}</b>?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Deleted',
          detail: `You have deleted ${applicationService.name}.` });
        this.deleteService(applicationService.id);
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: `You have rejected to delete ${applicationService.name}.` });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      }
    });
  }


  deleteService(applicationServiceId: bigint): void {
    this.userService.deleteUserService(applicationServiceId).subscribe(
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

  clearForms() {
    this.showModal1 = false;
    this.showModal2 = false
    this.newServiceForm.reset();
    this.editServiceForm.reset();
  }

  showDialog1() {
    this.showModal1 = true;
  }

  showDialog2(service: any) {
    this.editServiceForm.setValue({
      id: service.id,
      name: service.name,
      cost: service.cost,
      description: service.description
    })
    this.showModal2 = true;
  }

  onSubmitCreation(): void {
    this.newService.name = this.newServiceForm.value.name;
    this.newService.cost = this.newServiceForm.value.cost;
    this.newService.description = this.newServiceForm.value.description;

    // Call the service to create the service
    this.userService.createService(this.newService).subscribe(
      (newService) => {
        this.services.push(newService);
      },
      (error) => {
        console.error('Failed to edit service:', error);
        // Optionally, you can handle error cases here
      }
    );
    this.clearForms();
  }

  onSubmitEdit(): void {
    this.updatedService.id = this.editServiceForm.value.id;
    this.updatedService.name = this.editServiceForm.value.name;
    this.updatedService.cost = this.editServiceForm.value.cost;
    this.updatedService.description = this.editServiceForm.value.description;

    const oldService = this.services.find(service => service.id === this.newService.id);

    // Call the service to edit the service
    this.userService.editService(this.updatedService).subscribe(
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
    this.clearForms();
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
