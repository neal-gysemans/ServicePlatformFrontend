import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  getToken(): User | null {
    if(this.isLoggedIn()) {
      return {
        id: parseInt()
      }
    }
  }
}
