import {Route} from "@angular/router";
import {MyBookingsComponent} from "./my-bookings/my-bookings.component";
import {AllServicesComponent} from "./shop/all-services.component";
import {MyServicesComponent} from "./my-services/my-services.component";
import {BasicUserHomepageComponent} from "./overview/basic-user-homepage.component";

export const userRoutes: Route[] = [
  {path: '', component: BasicUserHomepageComponent},
  {path: 'all', component: AllServicesComponent},
  {path: 'services', component: MyServicesComponent},
  {path: 'bookings', component: MyBookingsComponent},

];
