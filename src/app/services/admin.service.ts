import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApplicationServiceAndUserResponse} from "../dto/ApplicationServiceAndUserResponse";
import {environment} from "../shared/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private readonly http: HttpClient) { }

  getAllServices(): Observable<ApplicationServiceAndUserResponse[]>{
    return this.http.get<ApplicationServiceAndUserResponse[]>(`${environment.apiUrl}/application-service/all`)
  }

  deleteUserService(applicationServiceId: bigint): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${environment.apiUrl}/admin/application-service/delete/${applicationServiceId}`, { observe: 'response' });
  }
}
