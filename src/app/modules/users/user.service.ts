import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) { }

  getByToken(token: string) {
    return this.http.get(`${this.apiUrl}/users/token/${token}`);
  }
}
