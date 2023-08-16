import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {CalendarModule} from "primeng/calendar";
import {ToastModule} from "primeng/toast";
import {AdminHomepageComponent} from "./service-management/admin-homepage.component";
import {UserManagementComponent} from "./user-management/user-management.component";


@NgModule({
  declarations: [
    AdminHomepageComponent,
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ConfirmDialogModule,
    CalendarModule,
    ToastModule,
  ],
  exports: [
    AdminHomepageComponent,
    UserManagementComponent
  ]
})
export class AdminModule {
}
