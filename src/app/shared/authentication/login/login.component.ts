import {Component} from '@angular/core';
import {AuthService} from '../../../security/auth.service';
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  credentialsForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService,
              private formBuilder: FormBuilder) {
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.credentials.email = this.credentialsForm.value.email;
    this.credentials.password = this.credentialsForm.value.password;

    this.authService.login(this.credentials).subscribe(
      () => {

          this.router.navigate(['']);
        this.messageService.add({severity: 'info', summary: 'Login succesful'});

      },
      (error) => {

        this.messageService.add({severity: 'error', summary: 'Login Error', detail: 'Invalid username or password.'});

      }
    );
  }

}
