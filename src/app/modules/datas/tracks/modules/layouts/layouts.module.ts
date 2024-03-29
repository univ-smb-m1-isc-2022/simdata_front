import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutFormComponent } from './layout.form/layout.form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatStepperModule} from "@angular/material/stepper";
import {WidgetsModule} from "../../../../widgets/widgets.module";
import { LayoutComponent } from './layout/layout.component';
import {DatasModule} from "../../../datas.module";



@NgModule({
  declarations: [
    LayoutFormComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatStepperModule,
    ReactiveFormsModule,
    WidgetsModule,
    DatasModule
  ],
  exports: [
    LayoutFormComponent,
    LayoutComponent
  ]
})
export class LayoutsModule { }
