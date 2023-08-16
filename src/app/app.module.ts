import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HomepageComponent} from './guest/shop/homepage.component';
import {MenubarModule} from "primeng/menubar";
import {InputTextModule} from "primeng/inputtext";
import {NavigationComponent} from './shared/navigation/navigation.component';
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';
import {jwtConfig} from "./security/auth.config";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthInterceptor} from "./security/auth-interceptor";
import {DialogModule} from "primeng/dialog";
import {CalendarModule} from "primeng/calendar";
import {DialogService} from "primeng/dynamicdialog";
import {TieredMenuModule} from "primeng/tieredmenu";
import {InformationComponent} from './shared/information/information.component';
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {UnauthorizedComponent} from './shared/unauthorized/unauthorized.component';
import {NotFoundComponent} from './shared/not-found/not-found.component';
import {AppRoutingModule} from "./app-routing.module";


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavigationComponent,
    InformationComponent,
    UnauthorizedComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MenubarModule,
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
    ToastModule,

    AppRoutingModule,
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
