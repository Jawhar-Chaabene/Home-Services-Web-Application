import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Users } from 'src/model/user.model';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  editedUser: Users; // Define a variable to hold the edited user data
  selectedImage: File | null = null; // Variable to hold the selected image file

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient, // Inject AuthenticationService
    public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public currentUser: Users
  ) {
    // Clone currentUser to editedUser to avoid modifying original data until saved
    this.editedUser = { ...currentUser };
  }

  onFileSelected(event: any): void {
    // Get the selected image file
    this.selectedImage = event.target.files[0];
  }

  saveProfile(): void {
    if (this.selectedImage) {
      // If a new image is selected, upload it first
      const formData = new FormData();
      formData.append('file', this.selectedImage);
      formData.append('upload_preset', 'dalidd'); // Cloudinary upload preset
      this.http.post<any>('https://api.cloudinary.com/v1_1/dexzirjuk/image/upload', formData)
        .subscribe(
          (res) => {
            this.editedUser.img = [res.secure_url]; // Update the editedUser's image URL
            this.updateUserAndRefresh(); // Call the new method to update user and refresh
          },
          (err) => {
            console.error('Error uploading image to Cloudinary:', err);
          }
        );
    } else {
      // If no new image is selected, update the user directly
      this.updateUserAndRefresh(); // Call the new method to update user and refresh
    }
  }

  updateUserAndRefresh(): void {
    this.authService.updateUser(this.editedUser).subscribe(
      updatedUser => {
        // Optionally, you can handle success, show a message, or navigate to another page
        console.log('Profile updated successfully:', updatedUser);
        window.location.reload(); // Refresh the page after successful update
      },
      error => {
        // Handle error if update fails
        console.error('Error updating profile:', error);
      }
    );
  }


  updateUser(): void {
    this.authService.updateUser(this.editedUser).subscribe(
      updatedUser => {
        // Optionally, you can handle success, show a message, or navigate to another page
        console.log('Profile updated successfully:', updatedUser);
        this.dialogRef.close(); // Close the dialog after successful update
      },
      error => {
        // Handle error if update fails
        console.error('Error updating profile:', error);
      }
    );
  }

  onImageSelected(event: any): void {
    // Get the selected image file
    this.selectedImage = event.target.files[0];
  }
}
