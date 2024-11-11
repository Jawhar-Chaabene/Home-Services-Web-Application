import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Reservation } from 'src/model/reservation.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  reservations: Reservation[] = [];
  username: string = '';
  userRole: string = '';

  constructor(private orderService: OrderService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.getUserRole().subscribe(role => {
      this.userRole = role
    });
    this.authService.getUsername().subscribe((username) => {
      this.username = username;
      if (this.username) {
        this.loadReservations();
      }
    });

  }

  loadReservations(): void {
    this.orderService.getReservationsByUsername(this.username, this.userRole === "prestateur").subscribe((reservations) => {
      this.reservations = reservations;
    });
  }

  updateAcceptation(reservation: Reservation, acceptation: boolean): void {
    reservation.acceptation = acceptation;
    this.orderService.updateAcceptation(reservation).subscribe(
      () => {
        console.log('Reservation updated successfully');
        // Optionally, update component state or display a success message
        // Reload reservations after updating
        this.loadReservations();
      },
      error => {
        console.error('Error updating reservation:', error);
        // Handle error - display an error message to the user
      }
    );
  }
  currentPage = 1;
  itemsPerPage = 5; // Nombre d'éléments par page
  totalItems = 100; // Total des éléments dans la liste

  // Fonction pour naviguer à la page précédente
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Fonction pour naviguer à la page suivante
  nextPage() {
    const maxPage = Math.ceil(this.totalItems / this.itemsPerPage);
    if (this.currentPage < maxPage) {
      this.currentPage++;
    }
  }
}