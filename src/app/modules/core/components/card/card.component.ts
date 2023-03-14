import {Component, Input, OnInit} from '@angular/core';
import type {Card} from "../../models/card.model";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card: Card = {title: "Title", data: "000"};

  constructor() { }

  ngOnInit(): void {
  }

}
