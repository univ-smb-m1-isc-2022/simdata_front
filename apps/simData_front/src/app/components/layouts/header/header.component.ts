import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service';
import { User } from '../../../models/user';
import { ConnectionService } from '../../../services/connection/connection.service';
import { Router } from '@angular/router';

interface Nav {
  link: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLight: boolean = false;
  //user is an Observable of User
  user: User | null = null;
  isHeaderShort: boolean = false;
  // @ts-ignore
  header__bar: Element;

  constructor(
    private themeService: ThemeService,
    private connectService: ConnectionService,
    private router: Router
  ) {
    this.connectService.userConnected$.subscribe((data: User | null) => {
      this.user = data;
    });
  }

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

    //theme
    this.isLight = this.themeService.getTheme() === 'light';

    //header state (short or long)
    if (localStorage.getItem('isHeaderShort') === null) {
      localStorage.setItem('isHeaderShort', 'false');
    }
    this.isHeaderShort = localStorage.getItem('isHeaderShort') === 'true';
    // @ts-ignore
    this.header__bar = document.querySelector('.header__bar');
    // set the header state
    this.header__bar.classList.toggle('header__bar--short', this.isHeaderShort);
  }

  onChangeToggleTheme() {
    this.isLight = !this.isLight;
    this.themeService.toggleTheme(this.isLight ? 'light' : 'dark');
  }

  switchHeaderState() {
    this.isHeaderShort = !this.isHeaderShort;
    localStorage.setItem('isHeaderShort', this.isHeaderShort.toString());
    this.header__bar.classList.toggle('header__bar--short', this.isHeaderShort);
  }

  logout() {
    this.connectService.logout();
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
    return this.router.url === link;
  }
}
