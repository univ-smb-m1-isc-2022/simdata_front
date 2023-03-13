import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../modules/users/user.model";
import {ThemeService} from "../../modules/theme/theme.service";
import {AuthService} from "../../modules/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title:string | undefined = 'simData_front';
  user: User | null = null;

  isLight: boolean = false;

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.isLight = this.themeService.getTheme() === 'light';


  }

  ngOnInit(): void {
    this.authService.getUserConnectedObs().subscribe(user => {
      this.user = user;
      console.log(user);
    });
    //get the url
    this.activatedRoute.url.subscribe(url => {
      this.title = url[0].path;
    });
  }

  onChangeToggleTheme() {
    this.isLight = !this.isLight;
    this.themeService.toggleTheme(this.isLight ? 'light' : 'dark');
  }

}
