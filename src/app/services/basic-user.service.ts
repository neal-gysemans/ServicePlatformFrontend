import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApplicationServiceAndUserResponse} from "../dto/ApplicationServiceAndUserResponse";
import {environment} from "../shared/environment";
import {BookingReponse} from "../dto/BookingReponse";
import {NewApplicationServiceCommand} from "../dto/NewApplicationServiceCommand";
import {NewBookingCommand} from "../dto/NewBookingCommand";

@Injectable({
  providedIn: 'root'
})
export class BasicUserService {

  constructor(private readonly http: HttpClient) {
  }

  getServices(): Observable<ApplicationServiceAndUserResponse[]> {
    return this.http.get<ApplicationServiceAndUserResponse[]>(`${environment.apiUrl}/application-service/personal`)
  }

  getAllServices(): Observable<ApplicationServiceAndUserResponse[]> {
    return this.http.get<ApplicationServiceAndUserResponse[]>(`${environment.apiUrl}/application-service/all`)
  }

  getBookings(): Observable<BookingReponse[]> {
    return this.http.get<BookingReponse[]>(`${environment.apiUrl}/booking/personal`)
  }

  createService(newService: NewApplicationServiceCommand): Observable<ApplicationServiceAndUserResponse> {
    return this.http.post<ApplicationServiceAndUserResponse>(`${environment.apiUrl}/application-service/create`, newService)
  }

  createBooking(newBookingCommand: NewBookingCommand): Observable<BookingReponse> {
    console.log("userService engaged");
    console.log(newBookingCommand);
    return this.http.post<BookingReponse>(`${environment.apiUrl}/booking/create`, newBookingCommand);
  }
}
