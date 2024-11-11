import { Component } from '@angular/core';
import { PostListComponent } from '../post-list/post-list.component';
import { NavigationExtras, Router } from '@angular/router'; // Import Router
import { CategoryListComponent } from '../category-list/category-list.component';
import { Category } from 'src/model/category.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  searchKeyword: string = ''; // Define the searchKeyword property
  locationKeyword: string = '';
  Categories: string[] = [
    'Accounting / Finance',
    'Automotive Jobs',
    'Construction / Facilities',
    'Education Training',
    'Healthcare',
    'Restaurant / Food Service',
    'Transportation / Logistics',
    'Telecommunications'
  ];;


  constructor(private router: Router, private postListComponent: PostListComponent, private categoryListComponent: CategoryListComponent) {
    // this.categoryListComponent.categoriesLoaded.subscribe(
    //   (categories: Category[]) => {
    //     this.Categories = categories; // Assign the received categories to a property
    //   }
    // );
  }

  searchPosts(keyword: string, location: string): void {
    const var1 = keyword; // First variable
    const var2 = location; // Second variable
    const navigationExtras: NavigationExtras = {
      queryParams: {
        param1: var1, // Pass the first variable as a query parameter
        param2: var2 // Pass the second variable as a query parameter
      }
    };
    this.router.navigate(['/posts'], navigationExtras);
    // You can optionally trigger any additional logic here, such as fetching posts
  }
  getIconClass(category: string): string {
    switch (category) {
      case 'Accounting / Finance':
        return '<i class="ln ln-icon-Bar-Chart"></i>';
      case 'Automotive Jobs':
        return '<i class="fa-solid fa-car"></i>';
      case 'Construction / Facilities':
        return 'class="fas fa-user-hard-hat"';
      // Add cases for other categories as needed
      default:
        return '';
    }
  }

}