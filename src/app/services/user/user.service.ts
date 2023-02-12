import { Injectable } from '@angular/core';
import { User} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUser(){
    //return a sample user
    return {
      name: "John Doe"
    }
  }
}
