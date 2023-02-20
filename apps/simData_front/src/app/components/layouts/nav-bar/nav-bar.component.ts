import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service';
import { User } from '../../../models/user';
import { ConnectionService } from '../../../services/connection/connection.service';
import { Router } from '@angular/router';
import { Observable } from "rxjs";

interface Nav {
  link: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  isLight: boolean = false;
  //user is an Observable of User
  user$: Observable<User|null>;
  user: User | null = null;
  isHeaderShort: boolean = false;
  // @ts-ignore
  header__bar: Element;

  constructor(
    private themeService: ThemeService,
    private connectService: ConnectionService,
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
    this.user = this.connectService.getUserValue();
    this.connectService.getUser().subscribe((user) => {
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
    let urlWithoutQuery = this.router.url.split('?')[0];
    return urlWithoutQuery === link;
  }
}
