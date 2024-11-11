// auth.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Userinfo, Users } from 'src/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private username: string = '';
  private currentUser: Users | null = null;
  constructor(private http: HttpClient) { }


  setUsername(username: string): void {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }
  setCurrentUser(user: Users): void {
    this.currentUser = user;
  }

  getCurrentUser(): Users | null {
    return this.currentUser;
  }
}