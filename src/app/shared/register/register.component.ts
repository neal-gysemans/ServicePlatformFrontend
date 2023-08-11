import { Component } from '@angular/core';
import { AuthService } from '../../security/auth.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

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

  credentials: any = {
    email: '',
    password: ''
  }

  registerForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder,
              private messageService: MessageService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    this.user.email = this.registerForm.value.email;
    this.credentials.email = this.registerForm.value.email;

    this.user.password = this.registerForm.value.password;
    this.credentials.password = this.registerForm.value.password;

    this.user.name = this.registerForm.value.name;

    this.authService.register(this.user).subscribe(
      () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Succesful registration',
          detail: `Welcome to this service platform!`
        });

        this.authService.login(this.credentials).subscribe(
          () => {
            this.router.navigate(['']);
            this.messageService.add({severity: 'info', summary: 'Login succesful'});

          },
          (error) => {
            this.messageService.add({severity: 'error', summary: 'Login Error', detail: 'Invalid username or password.'});
          }
        );
      },
      (error) => {
        console.log(error)
        if(error.status === 409){
          this.messageService.add({
            severity: 'error',
            summary: 'User already exists',
            detail: `There is already a user registered on that email.`
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: `Please check that you filled in all fields correctly`
          });
        }
      }
    );

  }
}
