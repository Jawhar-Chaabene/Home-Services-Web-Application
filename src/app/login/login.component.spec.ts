import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  login(): void {
    this.authService.login({ username: this.username, password: this.password })
      .subscribe(
        () => {
          this.authService.isAuthenticated().subscribe(authData => {
            if (authData.isAuthenticated) {
              if (authData.role === 'client') {
                this.router.navigate(['/posts']);
              } else if (authData.role === 'prestateur') {
                this.router.navigate(['/profile']);
              }
            } else {
              this.errorMessage = 'Invalid username or password';
            }
          });
        },
        (error) => {
          this.errorMessage = 'Error occurred during login';
        }
      );
  }
}
