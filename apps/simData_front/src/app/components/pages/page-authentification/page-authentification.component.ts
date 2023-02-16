import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConnectionService } from '../../../services/connection/connection.service';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { ThemeService } from '../../../services/theme/theme.service';
import { SassHelperService } from "../../../services/sass-helper/sass-helper.service";


@Component({
  selector: 'app-page-authentification',
  templateUrl: './page-authentification.component.html',
  styleUrls: ['./page-authentification.component.scss'],
  providers: [ConnectionService]
})
export class PageAuthentificationComponent implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;
  losSwitch: boolean = false;

  lor: boolean = true;

  constructor(
    private connectService: ConnectionService,
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
      this.connectService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .then((success: any) => {
          if (success) {
            //redirect to tracks
            this.router.navigate(['/tracks']).then((r) => console.log(r));
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
      this.connectService
        .signUp(
          this.signupForm.value.username,
          this.signupForm.value.email,
          this.signupForm.value.password
        )
        .then((success: any) => {
          if (success) {
            //redirect to tracks
            this.router.navigate(['/tracks']).then((r) => console.log(r));
          }
        })
        .catch((error) => {
          //change state of the button, remove all others
          console.log(error);
        });
    }
  }

  handleSubmitButtonHover(button: MatButton, formGroup: FormGroup) {
    if (!formGroup.valid) {
      //if leftOrRight is true, we move the button to the right, else to the left
      if (this.lor) {
        button._elementRef.nativeElement.style.transform =
          'translateX(calc(150px - ' +
          button._elementRef.nativeElement.offsetWidth +
          'px))';
      } else {
        button._elementRef.nativeElement.style.transform =
          'translateX(calc(-150px + ' +
          button._elementRef.nativeElement.offsetWidth +
          'px))';
      }
      //we change the value of leftOrRight
      this.lor = !this.lor;
    }
  }

  stateOfForm(loginForm: FormGroup): string {
    //if valid return 'primary',
    //if invalid and touched return 'warn',
    //if empty return 'basic'
    if (loginForm.valid) {
      return 'primary';
    } else if (loginForm.touched) {
      return 'warn';
    } else {
      return 'basic';
    }
  }

  selectForm(login: string) {
    this.losSwitch = login !== 'login';
  }

  getSassVar(varName: string): string {
    return this.sassService.readProperty(varName);
  }

  validatePasswords(group: FormGroup): null | { notSame: boolean } {
    const password = group.get('password')?.value;
    const passwordConfirm = group.get('passwordConfirm')?.value;
    if (!password || !passwordConfirm) return { notSame: true };
    return password === passwordConfirm ? null : { notSame: true };
  }
}
