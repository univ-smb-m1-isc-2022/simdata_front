import { Injectable } from '@angular/core';
import { apiUrl} from "../../../global";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Object} from "../../sim-data-shared/object/object.model";

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

  getId(objectType: string, objectName: string): Observable<number> {
    return this.http.get<number>(`${apiUrl}/${objectType}s/${objectName}/id`)
  }

  get(id: number) {
    return this.http.get<Object>(`${apiUrl}/objects/${id}`).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      })
    );
  }
}
