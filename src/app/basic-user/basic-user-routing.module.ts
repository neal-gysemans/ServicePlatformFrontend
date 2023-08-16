import {MyBookingsComponent} from "./my-bookings/my-bookings.component";
import {AllServicesComponent} from "./shop/all-services.component";
import {MyServicesComponent} from "./my-services/my-services.component";
import {BasicUserHomepageComponent} from "./overview/basic-user-homepage.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {path: '', component: BasicUserHomepageComponent},
  {path: 'all', component: AllServicesComponent},
  {path: 'services', component: MyServicesComponent},
  {path: 'bookings', component: MyBookingsComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicUserRoutingModule {
}

