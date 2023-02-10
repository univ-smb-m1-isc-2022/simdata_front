import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { UserService} from "../services/user.service";
import { User} from "../model/user";

interface Nav{
  link: string;
  name: string;
  icon: string;
};

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  isLight:boolean = false;
  user: User | undefined;

  constructor(
    private themeService: ThemeService,
    private userService: UserService
  ) {
    this.user = this.userService.getUser();
  }

  pages: Nav[] = [
    {
      link: '/dashboard',
      name: 'Dashboard',
      icon: 'chart-simple'
    },
    {
      link: '/championships',
      name: 'Championships',
      icon: 'trophy'
    },
    {
      link: '/drivers',
      name: 'Drivers',
      icon: 'user'
    },
    {
      link: "/tracks",
      name: "Tracks",
      icon: "map"
    },
    {
      link: "/teams",
      name: "Teams",
      icon: "users"
    },
    {
      link: "/cars",
      name: "Cars",
      icon: "car"
    }
  ];



  ngOnInit(): void {
    this.isLight = this.themeService.getTheme() === 'light';
  }

  onChangeToggleTheme(){
    this.isLight = !this.isLight;
    this.themeService.toggleTheme(this.isLight ? 'light' : 'dark');
  }

}
