import { Injectable } from "@angular/core";
import { CookieService } from "../cookie/cookie.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../../models/user";
import { BehaviorSubject } from "rxjs";
import { apiUrl} from "../../utils/globals";

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {

  headers: HttpHeaders;

  //create an observable of User
  private userConnectedSubject = new BehaviorSubject<User|null>(null);
  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const token = this.cookieService.get('auth-token');
    if (token !== undefined) {
      this.getUserByToken(token)?.subscribe((data: any) => {
        this.userConnectedSubject.next(data);
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
        .subscribe((data: any) => {
          if (data !== null) {
            this.cookieService.set('auth-token', data.token, 100);
            //change the user connected
            this.userConnectedSubject.next(data.user);
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
        .subscribe((data: any) => {
          if (data !== null) {
            this.cookieService.set('auth-token', data.token, 100);
            //change the user connected
            this.userConnectedSubject.next(data.user);
            resolve(true);
          } else {
            this.cookieService.delete('auth-token');
            resolve(false);
          }
        });
    });
  }

  public logout() {
    this.cookieService.delete('auth-token');
    this.userConnectedSubject.next(null);
  }

  public getUserByToken(token: string) {
    if (token === undefined) {
      return null;
    }
    return this.http.get(`${apiUrl}/user/token/${token}`, { headers: this.headers });
  }


  public getUser(){
    return this.userConnectedSubject.asObservable();
  }

  getUserValue() {
    return this.userConnectedSubject.getValue();
  }
}
