import { Component, OnInit } from '@angular/core';
import {ThemeService} from "../../modules/theme/theme.service";
import {User} from "../../modules/users/user.model";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../../modules/auth/auth.service";

interface Nav {
  link: string;
  name: string;
  icon: string;
}


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLight: boolean = false;
  //user is an Observable of User
  user: User | null = null;
  isHeaderShort: boolean = false;
  // @ts-ignore
  header__bar: Element;

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private router: Router
  ) {}

  pages: Nav[] = [
    {
      link: '/dashboard',
      name: 'Dashboard',
      icon: 'dashboard',
    },
    {
      link: '/championships',
      name: 'Championships',
      icon: 'emoji_events',
    },
    {
      link: '/drivers',
      name: 'Drivers',
      icon: 'person',
    },
    {
      link: '/tracks',
      name: 'Tracks',
      icon: 'map',
    },
    {
      link: '/teams',
      name: 'Teams',
      icon: 'security',
    },
    {
      link: '/cars',
      name: 'Cars',
      icon: 'directions_car',
    },
  ];

  ngOnInit(): void {
    this.authService.getUserConnectedObs().subscribe((user) => {
      this.user = user;
    });


    //theme
    this.isLight = this.themeService.getTheme() === 'light';

    //header state (short or long)
    if (localStorage.getItem('isHeaderShort') === null) {
      localStorage.setItem('isHeaderShort', 'false');
    }
  }



  logout() {
    this.authService.logout();
  }

  login() {
    this.router.navigate(['/login']).then((r) => console.log(r));
  }

  actionAccount() {
    if (!this.user) {
      this.router.navigate(['/login']).then((r) => console.log(r));
    }
  }

  isActive(link: string): boolean {
    let urlWithoutQuery = this.router.url.split('?')[0];
    return urlWithoutQuery === link;
  }

}
