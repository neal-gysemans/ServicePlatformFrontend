import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {guestRoutes} from "./guest/guest.routes";
import {AuthGuard} from "./auth.guard";
import {InformationComponent} from "./shared/information/information.component";
import {UnauthorizedComponent} from "./shared/unauthorized/unauthorized.component";
import {NotFoundComponent} from "./shared/not-found/not-found.component";

const routes: Routes = [
  {path: "", component: InformationComponent},

  {path: "guest", children: guestRoutes},
  {
    path: "basic_user",
    loadChildren: () => import('./basic-user/basic-user.module').then(m => m.BasicUserModule),
    canActivate: [AuthGuard], data: {'role': 'USER'}
  },

  {
    path: "admin",
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard], data: {'role': 'ADMIN'}
  },

  {
    path: "auth",
    loadChildren: () => import('./shared/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {path: 'unauthorized', component: UnauthorizedComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
