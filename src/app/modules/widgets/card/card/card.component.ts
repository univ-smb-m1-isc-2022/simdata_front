import {Component, Input, OnInit} from '@angular/core';
import type {Card} from "../card.model";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card: Card = {title: "Title", data: 0};

  constructor() { }

  ngOnInit(): void {
  }

}
