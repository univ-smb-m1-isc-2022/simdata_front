import {Component, Input, OnInit} from '@angular/core';
import {Layout} from "../layout.model";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @Input() layout!: Layout;

  constructor() { }

  ngOnInit(): void {
  }

}
