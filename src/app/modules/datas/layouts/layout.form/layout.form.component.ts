import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Layout} from "../layout.model";

@Component({
  selector: 'app-layout.form',
  templateUrl: './layout.form.component.html',
  styleUrls: ['./layout.form.component.scss']
})
export class LayoutFormComponent implements OnInit {

  layoutForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    grade: new FormControl('', [Validators.required]),
    length: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<LayoutFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {layouts: Layout[]},
  ) { }

  ngOnInit(): void {
  }

  checkNameUnique(objName:string) {
    this.data.layouts.forEach((layout) => {
      if (layout.name === this.layoutForm.get('name')?.value) {
        this.layoutForm.get('name')?.setErrors({unique: true});
      }
    });
  }

  protected readonly onsubmit = onsubmit;

  onSubmit() {
    this.dialogRef.close(
      {
        name: this.layoutForm.get('name')?.value,
        grade: this.layoutForm.get('grade')?.value,
        length: this.layoutForm.get('length')?.value
      }
    );
  }
}
