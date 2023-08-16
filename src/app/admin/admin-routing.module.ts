import {Route, RouterModule} from "@angular/router";
import {AdminHomepageComponent} from "./service-management/admin-homepage.component";
import {UserManagementComponent} from "./user-management/user-management.component";
import {NgModule} from "@angular/core";

const routes: Route[] = [
  {path: '', component: AdminHomepageComponent},
  {path: 'user-management', component: UserManagementComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}

