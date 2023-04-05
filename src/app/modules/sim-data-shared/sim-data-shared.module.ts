import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AttributeSelectedComponent} from "./attributes/attribute-selected/attribute-selected.component";
import {AttributeCardComponent} from "./attributes/attribute.card/attribute.card.component";
import {ObjectComponent} from "./object/object/object.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AttributeSelectedComponent,
    AttributeCardComponent,
    ObjectComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    AttributeSelectedComponent,
    AttributeCardComponent,
    ObjectComponent
  ]
})
export class SimDataSharedModule { }
