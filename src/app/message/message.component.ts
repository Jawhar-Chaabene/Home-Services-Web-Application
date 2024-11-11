import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ReservationService } from '../services/reservation.service';
import { UserService } from '../services/user.service';
import { Reservation } from 'src/model/reservation.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  username: string = '';
  acceptedReservation: Reservation | undefined;
  acceptanceMessage: string = '';

  constructor(
    private authService: AuthenticationService,
    private reservationService: ReservationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.authService.getUsername().subscribe((username) => {
      this.username = username;
      if (this.username) {
        this.reservationService.getReservationsForUser(this.username).subscribe((reservations) => {
          const acceptedReservation = reservations.find(reservation => reservation.acceptation === true);
          if (acceptedReservation) {
            this.acceptedReservation = acceptedReservation;
            this.userService.getUserByUsername(acceptedReservation.clientId).subscribe((user) => {
              this.acceptanceMessage = `Your reservation for the Prestaeur ${acceptedReservation.clientId} is accepted. Call them at ${user.phone}.`;
            });
          } else {
            this.acceptanceMessage = `You don't have any accepted reservations at the moment.`;
          }
        });
      }
    });
  }
  
}
