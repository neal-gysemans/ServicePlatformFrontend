import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomepageComponent } from './guest/homepage/homepage.component';
import {MenubarModule} from "primeng/menubar";
import {InputTextModule} from "primeng/inputtext";
import {RouterModule} from "@angular/router";
import { NavigationComponent } from './shared/navigation/navigation.component';
import { BasicUserHomepageComponent } from './basic-user/basic-user-homepage/basic-user-homepage.component';
import { AdminHomepageComponent } from './admin/admin-homepage/admin-homepage.component';
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Routes} from "./app.routes";
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import {jwtConfig} from "./security/auth.config";
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthInterceptor} from "./security/auth-interceptor";
import { MyServicesComponent } from './basic-user/my-services/my-services.component';
import { MyBookingsComponent } from './basic-user/my-bookings/my-bookings.component';
import {DialogModule} from "primeng/dialog";
import { AllServicesComponent } from './basic-user/all-services/all-services.component';


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
        DialogModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
