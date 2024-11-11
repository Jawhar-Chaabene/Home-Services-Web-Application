import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from 'src/model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/category'; // Update with your API endpoint

  constructor(private http: HttpClient) { }

  // Create a new category
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Read all categories
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Read a single category by ID
  getCategoryById(id: number): Observable<Category> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Category>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update a category
  updateCategory(category: Category): Observable<Category> {
    const url = `${this.apiUrl}/${category.id}`;
    return this.http.put<Category>(url, category)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete a category
  deleteCategory(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Handle errors
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred:';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
