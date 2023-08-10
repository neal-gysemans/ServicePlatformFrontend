import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HomepageComponent} from './guest/shop/homepage.component';
import {MenubarModule} from "primeng/menubar";
import {InputTextModule} from "primeng/inputtext";
import {RouterModule} from "@angular/router";
import {NavigationComponent} from './shared/navigation/navigation.component';
import {BasicUserHomepageComponent} from './basic-user/overview/basic-user-homepage.component';
import {AdminHomepageComponent} from './admin/service-management/admin-homepage.component';
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Routes} from "./app.routes";
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';
import {jwtConfig} from "./security/auth.config";
import {LoginComponent} from './shared/login/login.component';
import {RegisterComponent} from './shared/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthInterceptor} from "./security/auth-interceptor";
import {MyServicesComponent} from './basic-user/my-services/my-services.component';
import {MyBookingsComponent} from './basic-user/my-bookings/my-bookings.component';
import {DialogModule} from "primeng/dialog";
import {AllServicesComponent} from './basic-user/shop/all-services.component';
import {CalendarModule} from "primeng/calendar";
import {DialogService} from "primeng/dynamicdialog";
import {UserManagementComponent} from './admin/user-management/user-management.component';
import {TieredMenuModule} from "primeng/tieredmenu";
import {InformationComponent} from './shared/information/information.component';
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavigationComponent,
    BasicUserHomepageComponent,
    AdminHomepageComponent,
    LoginComponent,
    RegisterComponent,
    MyServicesComponent,
    MyBookingsComponent,
    AllServicesComponent,
    UserManagementComponent,
    InformationComponent,
    UnauthorizedComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MenubarModule,
    RouterModule.forRoot(Routes),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useValue: jwtConfig
      }
    }),
    InputTextModule,
    ButtonModule,
    TableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ConfirmDialogModule,
    CalendarModule,
    TieredMenuModule,
    ToastModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    DialogService,
    ConfirmationService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
