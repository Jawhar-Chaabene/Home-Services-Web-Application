import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/model/category.model';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent {
  categoryName: string;
  categoryDescription: string;

  constructor(
    public dialogRef: MatDialogRef<CategoryEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category?: Category }
  ) {
    if (data && data.category) {
      // Editing an existing category
      this.categoryName = data.category.name;
      this.categoryDescription = data.category.sous_categorie;
    } else {
      // Creating a new category
      this.categoryName = '';
      this.categoryDescription = '';
    }
  }


  saveChanges(): void {
    // Perform save operation and update category details in the database
    // For demonstration purposes, we'll just log the updated values
    console.log('Updated Name:', this.categoryName);
    console.log('Updated Description:', this.categoryDescription);

    // Close the dialog after saving changes
    this.dialogRef.close();
  }

  closeDialog(): void {
    // Close the dialog without saving changes
    this.dialogRef.close();
  }
}
