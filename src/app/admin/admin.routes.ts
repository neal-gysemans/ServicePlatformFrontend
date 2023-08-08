import {Route} from "@angular/router";
import {AdminHomepageComponent} from "./admin-homepage/admin-homepage.component";
import {UserManagementComponent} from "./user-management/user-management.component";

export const adminRoutes: Route[] = [
  { path: '', component: AdminHomepageComponent },
  { path: 'user-management', component: UserManagementComponent },

];
