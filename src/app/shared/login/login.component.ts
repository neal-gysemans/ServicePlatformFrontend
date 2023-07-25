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

        console.log('Access Token:', accessToken);
        this.router.navigate(['/basic_user/']); // Replace 'success-page' with the desired route

        // Login successful, you can redirect to the desired page or handle it as needed.
        console.log('Login successful');
      },
      (error) => {
        // Handle login error here
        console.error('Login error:', error);
      }
    );
  }
}
