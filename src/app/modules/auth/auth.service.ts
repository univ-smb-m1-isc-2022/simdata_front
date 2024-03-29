import { Injectable } from '@angular/core';
import {CookieService} from "../core/services/cookie/cookie.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {userConnectedSubject} from "./auth.store";
import {UserService} from "../users/user.service";
import {apiUrl} from "../../global";
import {take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private userService: UserService
  ) {
    const token = this.cookieService.get('auth-token');
    if (token !== undefined) {
      this.userService.getByToken(token)?.subscribe((data: any) => {
        userConnectedSubject.next(data);
      });
    }
  }

  public login(email: string, password: string): Promise<boolean> {

    return new Promise((resolve, reject) => {
      this.http
        .post(
          `${apiUrl}/login`,
          { email: email, password: password },
          { headers: this.headers }
        )
        .pipe(take(1))
        .subscribe((data: any) => {
          if (data !== null) {
            this.cookieService.set('auth-token', data.token, 100);
            //change the user connected
            console.log(data.user);
            userConnectedSubject.next(data.user);
            resolve(true);
          } else {
            this.cookieService.delete('auth-token');
            resolve(false);
          }
        });
    });
  }

  public signUp(username: string, email: string, password: string): Promise<boolean> {

    return new Promise((resolve, reject) => {
      this.http
        .post(
          `${apiUrl}/signup`,
          { username: username, email: email, password: password },
          { headers: this.headers }
        )
        .pipe(take(1))
        .subscribe((data: any) => {
          if (data !== null) {
            this.cookieService.set('auth-token', data.token, 100);
            //change the user connected
            userConnectedSubject.next(data.user);
            resolve(true);
          } else {
            this.cookieService.delete('auth-token');
            resolve(false);
          }
        });
    });
  }

  getUserConnectedObs(){
    return userConnectedSubject.asObservable();
  }

  public logout() {
    this.cookieService.delete('auth-token');
    userConnectedSubject.next(null);
  }

  isLogged() {
    return this.cookieService.get('auth-token') !== undefined;
  }
}
