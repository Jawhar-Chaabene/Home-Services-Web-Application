import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  userRole: string = '';
  username: string = ''; // Add username property

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        this.authService.getUserRole().subscribe(role => {
          this.userRole = role;
          // Fetch username if the user is authenticated
          this.authService.getUsername().subscribe(username => {
            this.username = username;
          });
        });
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isClient(): boolean {
    return this.userRole === 'client';
  }
  isPrest(): boolean {
    return this.userRole === 'prestateur';
  }

  isAdmin(): boolean {
    return this.userRole === 'admin';
  }
}