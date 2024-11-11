import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) { }

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
  banUser(userId: number): void {
    const userToUpdate = this.users.find(user => user.id === userId);
    if (userToUpdate) {
      userToUpdate.status = false; // Set status to false for banned
      this.userService.updateUser(userToUpdate).subscribe(() => {
        // Optionally, update the user list after banning the user
      });
    }
  }

  unbanUser(userId: number): void {
    const userToUpdate = this.users.find(user => user.id === userId);
    if (userToUpdate) {
      userToUpdate.status = true; // Set status to true for unbanned
      this.userService.updateUser(userToUpdate).subscribe(() => {
        // Optionally, update the user list after unbanning the user
      });
    }
  }
}  