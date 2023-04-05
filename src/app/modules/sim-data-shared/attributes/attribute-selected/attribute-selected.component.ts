import {Component, Input, OnInit} from '@angular/core';
import {AttributeService} from "../attribute.service";
import {Attribute} from "../attribute.model";

@Component({
  selector: 'app-attribute-selected',
  templateUrl: './attribute-selected.component.html',
  styleUrls: ['./attribute-selected.component.scss']
})
export class AttributeSelectedComponent implements OnInit {


  attribute!:Attribute;

  constructor(
    private attributeService: AttributeService
  ) { }

  ngOnInit(): void {
    this.attribute = this.attributeService.getAttributeSelected().getValue() as Attribute;
    this.attributeService.getAttributeSelected().asObservable().subscribe(attr =>{
      if (attr){
        this.attribute = attr;
      }
    })
  }

  onClose(){
    this.attributeService.clearAttributeSelected();
  }

}
