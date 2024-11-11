import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../services/reservation.service';
import { AuthenticationService } from '../services/authentication.service';
import { OrderService } from '../services/order.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  reservationForm!: FormGroup;
  clientId: string = '';
  currentDate: string = '';
  postUsername: string = '';
  errorMessage: string = '';
  postSubject: string = '';
  selectedPost: any = {}; // Initialize selectedPost with an empty object

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
    private authService: AuthenticationService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    // this.activatedRoute.paramMap.subscribe(params => {
    //   // Retrieve the parameter value from the paramMap
    //   this.postUsername = params.get('id') as string; 
    // });
    this.activatedRoute.queryParams.subscribe(params => {
      this.postUsername = params['param1'];
      this.postSubject = params['param2'];
    });
    console.log(this.postSubject, this.postUsername)
    this.authService.getUsername().subscribe(username => {
      this.clientId = username;
      this.initForm(username);
    });

    this.currentDate = new Date().toISOString().slice(0, 10);
  }

  initForm(username: string): void {
    this.reservationForm = this.formBuilder.group({
      clientId: [username, Validators.required],
      username: [this.postUsername, Validators.required],
      subject: [this.postSubject],
      date: [this.currentDate, Validators.required],
      time: ['', Validators.required],
      timeEnd: ['', Validators.required],
      message: [''],
      acceptation: [''],
    });
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      const reservationData = this.reservationForm.value;
      this.reservationService.createReservation(reservationData).subscribe(
        (reservation) => {
          console.log('Reservation created successfully:', reservation);
          this.orderService.addOrder(reservationData);
          this.router.navigate(['/posts']);
        },
        (error: HttpErrorResponse) => {
          console.error('Error creating reservation:', error);
          if (error.status === 404) {
            this.errorMessage = 'Reservation not found. Please try again.';
          } else {
            this.errorMessage = 'An error occurred while creating the reservation. Please try again later.';
          }
        }
      );
    }
  }

  setSelectedPost(post: any): void {
    this.selectedPost = post;
    this.initForm(post.username); // Pass the username of the selected post to the initForm method
  }
}