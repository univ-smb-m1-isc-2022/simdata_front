import {Component, Input, OnInit} from '@angular/core';
import {Object} from "../object.model";
import {Attribute} from "../../attributes/attribute.model";
import {AttributeService} from "../../attributes/attribute.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.scss']
})
export class ObjectComponent implements OnInit {


  @Input() object!: Object;
  attributeSelected: Attribute | undefined;

  attributeSub: Subscription;

  constructor(
    private attributeService: AttributeService
  ) {
    this.attributeSub = this.attributeService.getAttributeSelected().asObservable().subscribe((attribute: Attribute | null) => {
      if (attribute){
        this.attributeSelected = attribute;
      }
    });
  }

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    this.attributeSub.unsubscribe();
  }

}
