import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { RegistrationService } from '../services/registration.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  username = '';
  email = '';
  password = '';
  role = 'client';
  phone = '';
  gender = ''; // Add gender property
  errorMessage = '';
  img: any[] = []; // Initialize as an empty array

  constructor(
    private _location: Location,
    private router: Router,
    private registrationService: RegistrationService,
    private authService: AuthenticationService,
    private http: HttpClient // Inject AuthenticationService
  ) { }

  register(): void {
    // Check if any of the required fields are empty
    if (!this.username || !this.email || !this.password || !this.phone || !this.gender || !this.role) {
      this.errorMessage = 'Please fill in all required fields';
      return; // Exit the method if any field is empty
    }

    // Proceed with registration if all fields are filled
    const userId = uuidv4();
    this.registrationService.register({
      id: userId,
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role,
      phone: this.phone,
      gender: this.gender, // Include gender in the registration payload
      status: true
    }).subscribe(
      () => {
        this.authService.login({ username: this.username, password: this.password }).subscribe(
          (response) => {
            if (response.user) {
              // If user's status is true, proceed with login based on role
              if (response.role === 'client' || response.role === 'prestateur' || response.role === 'admin') {
                // this.router.navigate(['/profil']);
                this._location.historyGo(-2);
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
      },
      error => {
        this.errorMessage = 'Registration failed. Please try again.';
      }
    );
  }
  // Function to handle image upload event
  previewImages(event: any): void {
    this.img = [];
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'dalidd');
        this.http.post<any>('https://api.cloudinary.com/v1_1/dexzirjuk/image/upload', formData)
          .subscribe(
            (res: any) => { // Specify the type of res as any or the type of your response
              this.img.push(res.secure_url);
              console.log(res.secure_url);
            },
            (err) => {
              console.error('Erreur lors du téléchargement de l\'image sur Cloudinary : ', err);
            }
          );
      }
    }
  }
}
