import { Component, Input, OnInit } from '@angular/core';
import { SassHelperService } from "../../../services/sass-helper/sass-helper.service";

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent{

  @Input() fillColor = 'black';
  @Input() size = 100;

  constructor(private sassService: SassHelperService) {

  }

}
