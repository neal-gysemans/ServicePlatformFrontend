import {Route} from "@angular/router";
import {BasicUserHomepageComponent} from "./basic-user-homepage/basic-user-homepage.component";
import {MyServicesComponent} from "./my-services/my-services.component";
import {MyBookingsComponent} from "./my-bookings/my-bookings.component";

export const userRoutes: Route[] = [
  { path: '', component: BasicUserHomepageComponent },
  { path: 'services', component: MyServicesComponent },
  { path: 'bookings', component: MyBookingsComponent },

];
