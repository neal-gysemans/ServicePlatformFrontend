import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApplicationServiceAndUserResponse} from "../dto/ApplicationServiceAndUserResponse";
import {environment} from "../shared/environment";
import {UserResponse} from "../dto/UserResponse";
import {UserStatusResponse} from "../dto/UserStatusResponse";
import {UpdateServiceCommand} from "../dto/UpdateServiceCommand";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private readonly http: HttpClient) { }

  getAllServices(): Observable<ApplicationServiceAndUserResponse[]>{
    return this.http.get<ApplicationServiceAndUserResponse[]>(`${environment.apiUrl}/application-service/all`)
  }

  getAllRegularUsers(): Observable<UserStatusResponse[]>{
    return this.http.get<UserStatusResponse[]>(`${environment.apiUrl}/admin/all-users`)
  }

  deleteUserService(applicationServiceId: bigint): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${environment.apiUrl}/admin/application-service/delete/${applicationServiceId}`, { observe: 'response' });
  }

  toggleUserActive(userId: bigint): Observable<UserStatusResponse> {
    return this.http.put<UserStatusResponse>(`${environment.apiUrl}/admin/toggle-active/${userId}`, {});
  }

  editService(updateService: UpdateServiceCommand) {
    return this.http.put<ApplicationServiceAndUserResponse>(`${environment.apiUrl}/admin/application-service/update`, updateService);
  }
}
