import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss']
})
export class SubmitButtonComponent implements OnInit {

  @Input() formGroup!: FormGroup;
  @ViewChild('submitButton') submitButton!: MatButton;

  constructor() { }

  lor: boolean = true;

  ngOnInit(): void {
  }

  handleSubmitButtonHover() {
    if (!this.formGroup.valid) {
      //if leftOrRight is true, we move the button to the right, else to the left
      if (this.lor) {
        this.submitButton._elementRef.nativeElement.style.transform =
          'translateX(calc(150px - ' +
          this.submitButton._elementRef.nativeElement.offsetWidth +
          'px))';
      } else {
        this.submitButton._elementRef.nativeElement.style.transform =
          'translateX(calc(-150px + ' +
          this.submitButton._elementRef.nativeElement.offsetWidth +
          'px))';
      }
      //we change the value of leftOrRight
      this.lor = !this.lor;
    }
  }

  stateOfForm(): string {
    //if valid return 'primary',
    //if invalid and touched return 'warn',
    //if empty return 'basic'
    if (this.formGroup.valid) {
      return 'primary';
    } else if (this.formGroup.touched) {
      return 'warn';
    } else {
      return 'basic';
    }
  }

}
