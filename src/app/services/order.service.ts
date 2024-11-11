import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from 'src/model/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/reservations';

  constructor(private http: HttpClient) { }

  getReservationsByUsername(username: string, prestateur: boolean): Observable<Reservation[]> {
    if (prestateur) {
      const url = `${this.apiUrl}?username=${username}`;
      return this.http.get<Reservation[]>(url);
    }
    else {
      const url = `${this.apiUrl}?clientId=${username}`;
      return this.http.get<Reservation[]>(url);
    }
  }

  addOrder(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.apiUrl, reservation);
  }

  updateAcceptation(reservation: Reservation): Observable<any> {
    const url = `${this.apiUrl}/${reservation.id}`;
    // const updatedReservation = { acceptation: acceptation, clientId: clientId };
    return this.http.put<any>(url, reservation);
  }
}