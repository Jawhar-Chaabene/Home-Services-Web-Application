import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../services/authentication.service';
import { Users } from 'src/model/user.model';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { PostService } from '../services/post.service';
import { Post } from 'src/model/post.model';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  animations: [
    trigger('transitionMessages', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]

})
export class ProfilComponent implements OnInit {
  currentUser: Users | null = null;
  tab1: any[] = [];
  userPosts: Post[] = []; // Array to hold user's posts



  constructor(
    private authService: AuthenticationService,
    private postService: PostService,
    private dialog: MatDialog,
    private router: Router,
    private AS: PostService,


  ) { }

  ngOnInit(): void {

    // Fetch the current user's information
    this.getPost()
    this.authService.getUserID().subscribe(userId => {
      // Check if the user ID is available
      if (userId) {
        // If user ID is available, fetch user details using the user ID
        this.authService.fetchCurrentUser(userId).subscribe(user => {
          // Store the fetched user details
          this.currentUser = user;

          // If the user is a prestateur, get his posts
          if (this.currentUser.role === 'prestateur') {
            this.postService.getPostsByUserId(userId).subscribe(posts => {
              this.userPosts = posts;
            });
          }
        });
      } else {
        // Handle case when user ID is not available
        console.error('User ID not available');
      }
    });
  }
  getPost() {
    this.postService.getPosts().subscribe((r) => {

    })
  }
  modifyPost(post: Post): void {
    this.postService.getPostById(post.id).subscribe(
      (retrievedPost: Post) => {
        this.router.navigate(['/posts/edit', post.id], { state: { post: retrievedPost } });
      },
      (error) => {
        console.error('Error retrieving post:', error);
      }
    );
  }
  openEditProfileDialog(): void {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '400px',
      data: this.currentUser
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If the dialog was closed with changes, update the currentUser
        this.currentUser = result;
      }
    });
  }


  delete(postId: string): void {
    console.log(postId)
    this.postService.deletePost(postId).subscribe(() => {
      this.router.navigate(['/posts'])
    })
  }

}
