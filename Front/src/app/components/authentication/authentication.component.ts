import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css',
})
export class AuthenticationComponent implements OnInit {
  authenticationForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  loginFailed: boolean = false;
  errorMessage: string = '';
  loginSucceded: boolean = false;
  successMessage: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  handleLogin() {
    if (
      this.authenticationForm.value.email &&
      this.authenticationForm.value.password
    ) {
      this.authenticationService
        .authenticate(
          this.authenticationForm.value.email,
          this.authenticationForm.value.password
        )
        .subscribe({
          next: (data) => {
            this.loginSucceded = true;
            this.successMessage = 'Login successful. Redirecting...';
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 4000);
          },
          error: (err) => {
            this.loginFailed = true;
            this.errorMessage = 'Login failed. Please try again.';
          },
        });
    } else {
      console.log('Please enter a valid email and password.');
    }
  }
}
