import { Component, OnInit } from '@angular/core';
import { AuthentificationService} from "../../../services/authentification/authentification.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-page-authentification',
  templateUrl: './page-authentification.component.html',
  styleUrls: ['./page-authentification.component.scss']
})
export class PageAuthentificationComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private authService:AuthentificationService,
              private formBuilder:FormBuilder
              ) {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.loginForm= this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    });
  }


  onLoginSubmit(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value);
    }
  }

}
