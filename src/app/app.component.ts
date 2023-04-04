import { Component } from '@angular/core';
import {NavigationStart, Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  showHead = true;
  constructor(
    private router: Router
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.showHead = event['url'] != '/login';
      }
    });
  }

  isLoginPage(){
    return this.router.url == '/login';
  }
}
