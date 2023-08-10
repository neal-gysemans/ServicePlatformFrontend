import {Component} from '@angular/core';
import {AuthService} from '../../security/auth.service';
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

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

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {
  }

  onSubmit() {
    this.authService.login(this.credentials).subscribe(
      () => {
        const accessToken = localStorage.getItem('access_token');
        const userInfo = this.authService.getTokenInformation();
        const role = userInfo.role;

        console.log('Access Token:', accessToken);

        // Redirect the user based on their role
        if (role === 'ADMIN') {
          this.router.navigate(['']);
        } else if (role === 'USER') {
          this.router.navigate(['']);
        }
      },
      (error) => {

        this.messageService.add({severity: 'error', summary: 'Login Error', detail: 'Invalid username or password.'});

      }
    );
  }

}
