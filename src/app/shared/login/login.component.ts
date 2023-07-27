import { Component } from '@angular/core';
import { AuthService } from '../../security/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: any = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.credentials).subscribe(
      () => {
        const accessToken = localStorage.getItem('access_token');

        const role = this.authService.getUserRoleFromStorage();

        console.log('Access Token:', accessToken);

        // Redirect the user based on their role
        if (role === 'ADMIN') {
          this.router.navigate(['/admin']); // Redirect to the admin dashboard
        } else if (role === 'USER') {
          this.router.navigate(['/basic_user']); // Redirect to the user dashboard
        }
      },
      (error) => {
        // Handle login error
        console.log(error)
        console.log("Login failed")
      }
    );
  }
}
