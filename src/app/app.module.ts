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
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Routes} from "./app.routes";

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavigationComponent,
    BasicUserHomepageComponent,
    AdminHomepageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MenubarModule,
    RouterModule.forRoot(Routes),
    InputTextModule,
    ButtonModule,
    TableModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
