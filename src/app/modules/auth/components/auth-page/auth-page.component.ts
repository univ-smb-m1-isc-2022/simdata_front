import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ThemeService} from "../../../theme/theme.service";
import {AuthService} from "../../auth.service";
import {SassHelperService} from "../../../core/services/sass-helper/sass-helper.service";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  losSwitch: boolean = false;


  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    public themeService: ThemeService,
    private sassService: SassHelperService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]]
    }, {validator: this.validatePasswords});
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .then((success: any) => {
          if (success) {
            //redirect to tracks
            this.router.navigate(['/']).then((r) => console.log(r));
          }
        })
        .catch((error) => {
          //change state of the button, remove all others
          console.log(error);
        });
    }
  }

  onSignupSubmit() {
    if (this.signupForm.valid) {
      this.authService
        .signUp(
          this.signupForm.value.username,
          this.signupForm.value.email,
          this.signupForm.value.password
        )
        .then((success: any) => {
          if (success) {
            //redirect to tracks
            this.router.navigate(['/']).then((r) => console.log(r));
          }
        })
        .catch((error) => {
          //change state of the button, remove all others
          console.log(error);
        });
    }
  }

  selectForm(login: string) {
    this.losSwitch = login !== 'login';
  }

  validatePasswords(group: FormGroup): null | { notSame: boolean } {
    const password = group.get('password')?.value;
    const passwordConfirm = group.get('passwordConfirm')?.value;
    if (!password || !passwordConfirm) return { notSame: true };
    return password === passwordConfirm ? null : { notSame: true };
  }
}
