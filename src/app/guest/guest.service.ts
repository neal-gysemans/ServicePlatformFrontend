import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApplicationServiceAndUserResponse} from "../dto/ApplicationServiceAndUserResponse";
import {environment} from "../shared/environment";

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  constructor(private readonly http: HttpClient) { }

  getAllApplicationServices(): Observable<ApplicationServiceAndUserResponse[]>{
    return this.http.get<ApplicationServiceAndUserResponse[]>(`${environment.apiUrl}/application-service/all`)
  }
}
