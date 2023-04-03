import {NgModule} from "@angular/core";
import {SubmitButtonComponent} from "./submit-button/submit-button.component";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    SubmitButtonComponent
  ],
  imports: [
    MatButtonModule

  ],
  exports: [
    SubmitButtonComponent
  ]
})
export class WidgetsModule { }
