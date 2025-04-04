import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  constructor(private router: Router) {}
  email: string = '';
  password: string = '';
  emailError: boolean = false;
  passwordError: boolean = false;

  validateForm() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    this.emailError = !emailPattern.test(this.email);
    this.passwordError = this.password.trim() === '';

    if (!this.emailError && !this.passwordError) {
      alert('Form submitted successfully!');
      // Add actual form submission logic here
    }
  }

  navigateToLogin(){
    this.router.navigate(['/workflows']);
  }
}