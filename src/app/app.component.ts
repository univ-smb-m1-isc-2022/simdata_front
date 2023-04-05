import { Component } from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import {AttributeService} from "./modules/sim-data-shared/attributes/attribute.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  attributeSelected = false;

  showHead = true;
  constructor(
    private router: Router,
    private attributeService: AttributeService
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.showHead = event['url'] != '/login';
      }
    });
    this.attributeService.getAttributeSelected().asObservable().subscribe((attribute) => {
      this.attributeSelected = attribute != null;
    });
  }

  isLoginPage(){
    return this.router.url == '/login';
  }
}
