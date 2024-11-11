// reservation.model.ts

// reservation.model.ts

export interface Reservation {
    id: string; // Changed to string based on your API response
    
    clientId: string;
    username: string;
    date: string;
    time: string;
    timeEnd: string;
    message: string;
    acceptation: boolean; // Add the confirmed property
    
}


export enum ReservationStatus {
    Pending = 'pending',
    Accepted = 'accepted',
    Rejected = 'rejected'
}
