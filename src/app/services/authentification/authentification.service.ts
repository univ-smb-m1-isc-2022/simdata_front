import { Injectable } from '@angular/core';
import { CookieService} from "../cookie/cookie.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private apiURL = 'http://localhost:8080'; //TODO: changer l'URL
  constructor(private http:HttpClient,private cookieService:CookieService) { }

  login(email:string, password:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiURL}/login`, {email,password}, {headers});
  }

  isLoggedIn(){
    return this.cookieService.get('auth-token') !== undefined;
  }

  logout(){
    this.cookieService.delete('auth-token');
  }
}
