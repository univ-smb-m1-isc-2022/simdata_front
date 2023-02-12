import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service';
import { UserService} from "../../../services/user/user.service";
import { User} from "../../../models/user";

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
  isHeaderShort:boolean = false;
  // @ts-ignore
  header__bar:Element;

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

  onChangeToggleTheme(){
    this.isLight = !this.isLight;
    this.themeService.toggleTheme(this.isLight ? 'light' : 'dark');
  }

  switchHeaderState(){
    this.isHeaderShort = !this.isHeaderShort;
    localStorage.setItem('isHeaderShort', this.isHeaderShort.toString());
    this.header__bar.classList.toggle('header__bar--short', this.isHeaderShort);
  }

}
