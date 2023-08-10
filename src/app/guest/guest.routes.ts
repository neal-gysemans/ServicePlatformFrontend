import {Route} from "@angular/router";
import {HomepageComponent} from "./shop/homepage.component";

export const guestRoutes: Route[] = [
  { path: "", component: HomepageComponent},
];
