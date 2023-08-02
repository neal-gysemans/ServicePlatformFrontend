import {Route} from "@angular/router";
import {BasicUserHomepageComponent} from "./basic-user-homepage/basic-user-homepage.component";
import {MyBookingsComponent} from "./my-bookings/my-bookings.component";
import { AllServicesComponent } from "./all-services/all-services.component";
import {MyServicesComponent} from "./my-services/my-services.component";

export const userRoutes: Route[] = [
  { path: '', component: BasicUserHomepageComponent },
  { path: 'all', component: AllServicesComponent },
  { path: 'services', component: MyServicesComponent },
  { path: 'bookings', component: MyBookingsComponent },

];
