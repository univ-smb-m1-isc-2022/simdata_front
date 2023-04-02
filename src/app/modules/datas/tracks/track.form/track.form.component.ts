import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../services/data.service"
import {MatStepper} from "@angular/material/stepper";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LayoutFormComponent} from "../../layouts/layout.form/layout.form.component";
import {Layout} from "../../layouts/layout.model";
import {Dot} from "../../../maps/map.model";

@Component({
  selector: 'app-track.form',
  templateUrl: './track.form.component.html',
  styleUrls: ['./track.form.component.scss']
})
export class TrackFormComponent implements OnInit {



  baseForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
  });

  locationForm: FormGroup = new FormGroup({
    latitude: new FormControl('', [Validators.required]),
    longitude: new FormControl('', [Validators.required]),
  });

  layouts: Layout[] = [];

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<TrackFormComponent>,
  ) {
    this.layouts = [];
  }

  ngOnInit(): void {
  }

  checkNameUnique(objName:string) {
    let name:string = this.baseForm.get('name')?.value;
    if (name) {
      this.dataService.checkNameUnique(objName, name).subscribe((res) => {
        if (res) {
          this.baseForm.get('name')?.setErrors({unique: true});
        }
      });
    }
  }

  next(stepper:MatStepper) {
    //change the form to the next step
    stepper.next();
  }

  previous(stepper: MatStepper) {
    stepper.previous();
  }

  onNewLayout() {
    let dialogRef = this.dialog.open(LayoutFormComponent,{
      data:{ layouts: this.layouts }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.layouts.push(result);
      }
    });
  }

  onValidate() {
    let track = {
      name: this.baseForm.get('name')?.value,
      country: this.baseForm.get('country')?.value,
      latitude: this.locationForm.get('latitude')?.value,
      longitude: this.locationForm.get('longitude')?.value,
      layouts: this.layouts
    };
    this.dialogRef.close(track);
  }
}
