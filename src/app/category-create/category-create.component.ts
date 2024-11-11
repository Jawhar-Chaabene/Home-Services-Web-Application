import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/model/category.model';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
  styles: [`
    .mat-dialog-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `]
})
export class CategoryCreateComponent {
  @ViewChild('categoryForm') categoryForm!: NgForm;

  newCategory: any = { name: '', sous_categorie: [] };
  categories: Category[] = []; // Array to store existing categories
  sous_categorieInput: string = '';
  showPopup: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    public dialogRef: MatDialogRef<CategoryCreateComponent>
  ) {
    this.fetchCategories(); // Fetch categories when component is initialized
  }

  generateRandomId(): number {
    // Generate a random number between 1000 and 9999
    return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const categoryName = this.newCategory.name;
      const sous_categorie = this.newCategory.sous_categorie[0];

      // Check if the category name already exists
      if (this.categories.some(category => category.name === categoryName && category.sous_categorie.includes(sous_categorie))) {
        // Display error message to the user
        alert('Category with this name and sous_categorie already exists. Please choose a different name and sous_categorie.');
        return;
      }
      // Continue with form submission if category name is unique
      this.categoryService.createCategory(this.newCategory)
        .subscribe(
          (createdCategory: Category) => {
            console.log('Category created successfully:', createdCategory);
            // Reset the form after successful submission
            this.categoryForm.resetForm();
            // Close the dialog
            this.dialogRef.close(createdCategory);
          },
          (error) => {
            console.error('Error creating category:', error);
            alert('Failed to create category. Please try again later.');
          }
        );
    }
  }

  // Function to add a new sous_categorie to the newCategory object
  addSousCategorie(): void {
    // Add the current sous_categorie input to the sous_categorie array
    if (this.sous_categorieInput.trim() !== '') {
      this.newCategory.sous_categorie.push(this.sous_categorieInput.trim());
      // Clear the input field after adding
      this.sous_categorieInput = '';
    }
  }

  fetchCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }
}
