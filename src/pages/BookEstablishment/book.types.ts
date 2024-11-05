export interface TableCardProps {
    id:number;
    tableName: string;
    photoUrl: PhotoUrl;
    capacity: number;
    hallName: string;
    occupiedUntil?: TimeOfDay;
    occupiedFrom?: TimeOfDay;
    nextBooking?: TimeOfDay;
    freeTimePeriodForNextBooking?: TimeOfDay;
    bookings: Booking[];
    occupied?: boolean;
}


// book.types.ts
export interface TimeOfDay {
    hour: number;
    minute: number;
    second: number;
    nano: number;
}

export interface Booking {
    bookingStart: TimeOfDay;
    bookingEnd: TimeOfDay;
}

export interface PhotoUrl {
    id: number;
    title: string;
    imgUrl: string;
}