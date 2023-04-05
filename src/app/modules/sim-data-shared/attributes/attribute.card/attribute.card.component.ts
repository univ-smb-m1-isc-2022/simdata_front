import {Component, Input, OnInit} from '@angular/core';
import {Attribute} from "../attribute.model";
import {AttributeService} from "../attribute.service";

@Component({
  selector: 'app-attribute-card',
  templateUrl: './attribute.card.component.html',
  styleUrls: ['./attribute.card.component.scss']
})
export class AttributeCardComponent implements OnInit {

  @Input() attribute!: Attribute;

  constructor(
    private attributeService: AttributeService
  ) { }

  ngOnInit(): void {
  }

  isValueObject() {
    return this.attribute.value instanceof Object;
  }

  selectAttribute() {
    this.attributeService.setAtributeSelected(this.attribute);
  }
}
