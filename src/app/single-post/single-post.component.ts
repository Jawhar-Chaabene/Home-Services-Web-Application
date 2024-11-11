import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Post } from 'src/model/post.model';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  post: Post | undefined;
  userRole$!: Observable<string>;
  currentImageIndex: number = 0;
  parameterToSend: String = '';
  redirectUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userRole$ = this.authService.getUserRole();
    this.getPost();

  }

  getPost(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.postService.getPostById(id).subscribe(
        post => {
          this.post = post;
        },
        error => {
          console.error('Error fetching post:', error);
        }
      );
    }
  }


  nextImage(): void {
    if (this.post) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.post.imageUrl.length;
    }
  }
  navigateToLogin() {
    const currentPagePath = this.redirectUrl; // Get the current page path

    this.router.navigate(['/login']);
  }
  navigateToTargetWithParameter() {
    const parameterValue = this.post?.username; // Set the parameter value
    const var1 = this.post?.title; // First variable
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param1: parameterValue, // Pass the first variable as a query parameter
        param2: var1// Pass the second variable as a query parameter
      }
    };
    this.router.navigate(['/reservation'], navigationExtras); // Navigate to the target component

  }
  prevImage(): void {
    if (this.post) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.post.imageUrl.length) % this.post.imageUrl.length;
    }
  }
}