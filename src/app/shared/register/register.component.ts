import { Component } from '@angular/core';
import { AuthService } from '../../security/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: any = {
    email: '',
    name: '',
    password: ''
  };

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.user).subscribe(
      () => {
        console.log('Registration successful');

      },
      (error) => {
        // Handle registration error here
        console.error('Registration error:', error);
      }
    );
  }
}
