import { Component, OnInit } from '@angular/core';
import { Category } from 'src/model/category.model'; // Adjust the path as needed
import { Post } from 'src/model/post.model'; // Assuming you have a Post model, adjust the path as needed
import { CategoryService } from 'src/app/services/category.service'; // Adjust the path as needed
import { PostService } from 'src/app/services/post.service'; // Assuming you have a PostService, adjust the path as needed

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  categories: Category[] = [];
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  isMenuOpen = false;

  constructor(
    private categoryService: CategoryService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getPosts();
  }

  getCategories(): void {
    this.categoryService.getAllCategories()
      .subscribe(categories => this.categories = categories);
  }

  getPosts(): void {
    this.postService.getPosts()
      .subscribe(posts => {
        this.posts = posts;
        // Initially display all posts
        this.filteredPosts = posts;
      });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onSelectCategory(categoryName: string): void {
    // Filter posts by category
    if (categoryName === 'All Categories') {
      // Show all posts if "All Categories" is selected
      this.filteredPosts = this.posts;
    } else {
      // Filter posts by selected category
      this.filteredPosts = this.posts.filter(post => post.categoryName === categoryName);
    }
  }
}
