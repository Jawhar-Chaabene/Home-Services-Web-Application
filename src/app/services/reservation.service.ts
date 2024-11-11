import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from 'src/model/reservation.model';

@Injectable({
    providedIn: 'root'
})
export class ReservationService {
    private apiUrl = 'http://localhost:3000/reservations';
    

    constructor(private http: HttpClient) { }

    // Method to create a new reservation
    createReservation(reservation: Reservation): Observable<Reservation> {
        return this.http.post<Reservation>(this.apiUrl, reservation);
    }

    // Method to update an existing reservation
    updateReservation(reservation: Reservation): Observable<Reservation> {
        const url = `${this.apiUrl}/${reservation.id}`;
        return this.http.put<Reservation>(url, reservation);
    }

    // Method to delete a reservation
    deleteReservation(id: number): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete(url);
    }

    // Method to get all reservations for a specific post
    getReservationsForPost(username: string): Observable<Reservation[]> {
        const url = `${this.apiUrl}?postId=${username}`;
        return this.http.get<Reservation[]>(url);
    }

    // Method to get all reservations made by a specific user
    getReservationsForUser(username: string): Observable<Reservation[]> {
        const url = `${this.apiUrl}?username=${username}`;
        return this.http.get<Reservation[]>(url);
    }
}
