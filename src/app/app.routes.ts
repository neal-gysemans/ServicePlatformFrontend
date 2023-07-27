import {Route} from "@angular/router";
import {guestRoutes} from "./guest/guest.routes";
import {userRoutes} from "./basic-user/basic_user.routes";
import {adminRoutes} from "./admin/admin.routes";
import {RegisterComponent} from "./shared/register/register.component";
import {LoginComponent} from "./shared/login/login.component";
import {AuthGuard} from "./auth.guard";

export const Routes: Route[] = [
  { path: "guest", children: guestRoutes},
  { path: "basic_user", children: userRoutes, canActivate: [AuthGuard], data: { 'role': 'USER' }},
  { path: "admin", children: adminRoutes, canActivate: [AuthGuard], data: { 'role': 'ADMIN' }},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  /*{ path: "organisation-admin", children: orgManagerRoutes, canActivate: [AuthGuard] },
  { path: "platform-admin", children: platAdminRoutes, canActivate: [AuthGuard] },
  { path: "guest", children: guestRoutes }*/
];
