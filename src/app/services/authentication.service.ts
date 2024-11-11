import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Users } from 'src/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:3000/users';
  private isAuthenticatedSource = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSource.asObservable();
  private roleSource = new BehaviorSubject<string>('');
  role$ = this.roleSource.asObservable();
  private usernameSource = new BehaviorSubject<string>('');
  username$ = this.usernameSource.asObservable();
  private idSource = new BehaviorSubject<string>('');
  id$ = this.idSource.asObservable();

  constructor(private http: HttpClient) {
    // Initialize authentication state from browser storage on service instantiation
    this.loadAuthStateFromStorage();
  }

  login(credentials: { username: string, password: string }): Observable<{ user: any, role: string }> {
    return this.http.get<any>(`${this.apiUrl}?username=${credentials.username}&password=${credentials.password}`)
      .pipe(
        map(response => {
          if (response.length > 0) {
            const user = response[0];
            this.setAuthState(user); // Update authentication state on successful login
            return { user, role: user.role };
          } else {
            this.clearAuthState(); // Clear authentication state if login fails
            return { user: null, role: '' };
          }
        })
      );
  }

  logout(): void {
    this.clearAuthState();
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$;
  }
  clearUserData(): void {
    // Implement logic to clear any authentication tokens or user data
    // For example, you can clear tokens from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userdata');
  }

  getUserRole(): Observable<string> {
    return this.role$;
  }
  private loadAuthStateFromStorage(): void {
    const userJson = localStorage.getItem('currentUser');
    if (userJson !== null) {
      const user = JSON.parse(userJson);
      this.setAuthState(user);
    }
  }


  private setAuthState(user: any): void {
    this.isAuthenticatedSource.next(true);
    this.roleSource.next(user.role);
    this.usernameSource.next(user.username);
    this.idSource.next(user.id);
    localStorage.setItem('currentUser', JSON.stringify(user)); // Store user data in localStorage
  }

  private clearAuthState(): void {
    this.isAuthenticatedSource.next(false);
    this.roleSource.next('');
    this.usernameSource.next('');
    this.idSource.next('');
    localStorage.removeItem('currentUser'); // Remove user data from localStorage
  }

  fetchCurrentUser(userId: string): Observable<Users> {
    // Assuming you have an API endpoint to fetch current user info
    // Adjust the URL to match your backend
    return this.http.get<Users>(`http://localhost:3000/users/${userId}`);
  }
  updateUser(user: Users): Observable<Users> {
    // Assuming you have an API endpoint to update user information
    // Adjust the URL to match your backend
    return this.http.put<Users>(`${this.apiUrl}/${user.id}`, user);
  }
  getUsername(): Observable<string> {
    return this.username$;
  }

  getUserID(): Observable<string> {
    return this.id$;
  }
  getPhoneNumber(): Observable<string> {
    return this.getUser().pipe(
      map(user => user.phone)
    );
  }

  private getUser(): Observable<Users> {
    return this.http.get<Users>(`${this.apiUrl}/current`).pipe(
      tap(user => {
        this.isAuthenticatedSource.next(true);
        this.roleSource.next(user.role);
        this.usernameSource.next(user.username);
        this.idSource.next(user.id);
      }),
      catchError(error => {
        this.isAuthenticatedSource.next(false);
        this.roleSource.next('');
        this.usernameSource.next('');
        this.idSource.next('');
        return throwError(error);
      })
    );
  }
}
