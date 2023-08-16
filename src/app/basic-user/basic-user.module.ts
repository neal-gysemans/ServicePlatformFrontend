import {NgModule} from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {MyBookingsComponent} from "./my-bookings/my-bookings.component";
import {MyServicesComponent} from "./my-services/my-services.component";
import {AllServicesComponent} from "./shop/all-services.component";
import {BasicUserHomepageComponent} from "./overview/basic-user-homepage.component";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {InputTextModule} from "primeng/inputtext";
import {DialogModule} from "primeng/dialog";
import {CalendarModule} from "primeng/calendar";
import {TieredMenuModule} from "primeng/tieredmenu";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MenubarModule} from "primeng/menubar";
import {BrowserModule} from "@angular/platform-browser";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {BasicUserService} from "./basic-user.service";
import {BasicUserRoutingModule} from "./basic-user-routing.module";


@NgModule({
  declarations: [
    MyBookingsComponent,
    MyServicesComponent,
    AllServicesComponent,
    BasicUserHomepageComponent
  ],
  imports: [
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

    BasicUserRoutingModule

  ],
  exports: [
    MyBookingsComponent,
    MyServicesComponent,
    AllServicesComponent,
    BasicUserHomepageComponent
  ]
})
export class BasicUserModule {
}
