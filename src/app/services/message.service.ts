import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from 'src/model/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/reservation'; // Base URL of your API
  private apiUr = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }

  getAcceptedReservationsByUsername(username: string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/reservations?username=${username}&acceptation=true`);
  }

  getProviderContact(providerId: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/users/${providerId}/phone`);
  }
}
