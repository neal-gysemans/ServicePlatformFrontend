import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApplicationServiceAndUserResponse} from "../dto/ApplicationServiceAndUserResponse";
import {environment} from "../shared/environment";
import {BookingReponse} from "../dto/BookingReponse";
import {jwtConfig} from "../security/auth.config";

@Injectable({
  providedIn: 'root'
})
export class BasicUserService {

  constructor(private readonly http: HttpClient) { }

  getServices(): Observable<ApplicationServiceAndUserResponse[]>{
    return this.http.get<ApplicationServiceAndUserResponse[]>(`${environment.apiUrl}/application-service/personal`)
  }

  getBookings(): Observable<BookingReponse[]>{
    return this.http.get<BookingReponse[]>(`${environment.apiUrl}/booking/personal`)
  }
}
