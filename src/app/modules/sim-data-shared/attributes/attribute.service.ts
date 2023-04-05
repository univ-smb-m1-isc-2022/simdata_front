import { Injectable } from '@angular/core';
import { apiUrl} from "../../../global";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Attribute} from "./attribute.model";
import {HttpClient} from "@angular/common/http";
import {attributeSelected} from "./attribute.store";
@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  constructor(
    private http: HttpClient
  ) { }


  getAttributeSelected(): BehaviorSubject<Attribute | null> {
    return attributeSelected;
  }

  setAtributeSelected(attribute: Attribute) {
    attributeSelected.next(attribute);
  }

  getById(id: number): Observable<Attribute> {
    return this.http.get(`${apiUrl}/attributes/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  get(parentId:number,name:string): Observable<Attribute>{
    return this.http.get(`${apiUrl}/attributes/${parentId}/${name}`).pipe(
      map((res:any) => {
        return res;
      })
    );
  }

  clearAttributeSelected() {
    attributeSelected.next(null);
  }

}
