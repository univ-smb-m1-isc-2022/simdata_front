import { Injectable } from '@angular/core';
import { apiUrl} from "../../../global";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }


  checkNameUnique(objName:string, name:string):Observable<boolean> {
    return this.http.get(`${apiUrl}/${objName}/name/${name}`).pipe(
      map((res:any) => {
        return res.length > 0;
      }
    ));
  }
}
