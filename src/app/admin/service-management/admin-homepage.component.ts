import {Component, OnInit} from '@angular/core';
import {ApplicationServiceAndUserResponse} from "../../dto/ApplicationServiceAndUserResponse";
import {AdminService} from "../admin.service";
import {HttpResponse} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UpdateServiceCommand} from "../../dto/UpdateServiceCommand";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {
  services: ApplicationServiceAndUserResponse[] = [];

  updateService = {} as UpdateServiceCommand;

  serviceForm: FormGroup;
  showModal!: boolean;


  first = 0;

  rows = 10;


  constructor(private adminService: AdminService, private formBuilder: FormBuilder,
              private confirmationService: ConfirmationService, private messageService: MessageService) {
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

  fetchServices(): void {
    this.adminService.getAllServices().subscribe((services) => {
      this.services = services.sort((a, b) => {
        return a.serviceProvider.name.localeCompare(b.serviceProvider.name);
      });
    });
  }

  confirm(applicationService: ApplicationServiceAndUserResponse) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete <b>${applicationService.name}</b>?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'info', summary: 'Deleted',
          detail: `You have deleted ${applicationService.name}.`
        });
        this.deleteService(applicationService.id);
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: `You have rejected to delete ${applicationService.name}.`
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled'});
            break;
        }
      }
    });
  }

  deleteService(applicationServiceId: bigint): void {
    this.adminService.deleteUserService(applicationServiceId).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.fetchServices();
        } else {
        }
      },
      (error) => {
      }
    );
  }

  onSubmit() {
    this.updateService.id = this.serviceForm.value.id;
    this.updateService.name = this.serviceForm.value.name;
    this.updateService.cost = this.serviceForm.value.cost;
    this.updateService.description = this.serviceForm.value.description;

    const oldService = this.services.find(service => service.id === this.updateService.id);

    this.adminService.editService(this.updateService).subscribe(
      (editedService) => {
        const index = this.services.findIndex(service => service.id === editedService.id);

        if (index !== -1) {
          this.services[index] = editedService;
        }

      },
      (error) => {
        if (oldService) {
          const index = this.services.findIndex(service => service.id === oldService.id);
          if (index !== -1) {
            this.services[index] = oldService;
          }
        }
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
