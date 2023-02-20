import { Component, OnInit } from '@angular/core';
import { ThemeService } from "../../../services/theme/theme.service";
import { ConnectionService } from "../../../services/connection/connection.service";
import { User } from "../../../models/user";
import { ActivatedRoute, Router } from "@angular/router";

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
    private connectionService: ConnectionService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.isLight = this.themeService.getTheme() === 'light';


  }

  ngOnInit(): void {
    this.user = this.connectionService.getUserValue();
    this.connectionService.getUser().subscribe(user => {
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
