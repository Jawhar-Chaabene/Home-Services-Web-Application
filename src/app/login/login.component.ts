import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  clientId: string = '';
  users: any[] = [];

  constructor(private _location: Location,
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.GetAllUsers().subscribe(
      (data: any[]) => {
        this.users = data;

      },

      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  login(): void {
    const user = this.users.find(user => user.username === this.username); // Find user by username
    if (user && !user.status) {
      // If user exists and is blocked, display error message and prevent authentication
      this.errorMessage = 'Your account is blocked. Please contact support.';
      return; // Exit the method
    }

    // Proceed with authentication if user is not blocked
    this.authService.login({ username: this.username, password: this.password }).subscribe(
      (response) => {
        if (response.user) {
          // If user's status is true, proceed with login based on role
          if (response.role === 'client' || response.role === 'prestateur' || response.role === 'admin') {
            // this.router.navigate(['/profil']);
            this._location.back();
          }
        } else {
          // If authentication fails, display error message
          this.errorMessage = 'Invalid username or password';
          // Clear any authentication tokens or user data
          this.authService.clearUserData();
        }
      },
      (error) => {
        this.errorMessage = 'Error occurred during login';
      }
    );
  }
}