import { Injectable } from "@angular/core";
import { CookieService } from "../cookie/cookie.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { apiUrl} from "../../utils/globals";
import { userConnectedSubject} from "../../utils/store/userConnected.store";

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {

  headers: HttpHeaders;

  //create an observable of User

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const token = this.cookieService.get('auth-token');
    if (token !== undefined) {
      this.getUserByToken(token)?.subscribe((data: any) => {
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

  public logout() {
    this.cookieService.delete('auth-token');
    userConnectedSubject.next(null);
  }

  public getUserByToken(token: string) {
    if (token === undefined) {
      return null;
    }
    return this.http.get(`${apiUrl}/user/token/${token}`, { headers: this.headers });
  }


  public getUser(){
    return userConnectedSubject.asObservable();
  }

  getUserValue() {
    return userConnectedSubject.getValue();
  }
}
