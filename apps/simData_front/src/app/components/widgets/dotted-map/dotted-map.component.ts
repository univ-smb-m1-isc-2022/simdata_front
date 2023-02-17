import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { SassHelperService } from "../../../services/sass-helper/sass-helper.service";
import { Layout } from "../../../models/layout";

const DottedMap = require('dotted-map').default;

@Component({
  selector: 'app-dotted-map',
  templateUrl: './dotted-map.component.html',
  styleUrls: ['./dotted-map.component.scss'],
})
export class DottedMapComponent implements OnInit {

  map: any;

  @Input() layouts: Layout[] = [];
  constructor(
    private elementRef: ElementRef,
    private sassService:SassHelperService
  ) {
    this.map = new DottedMap({
      height: 90,
      grid:'vertical'
    });
  }

  ngOnInit(): void {
    for (let i = 0; i < this.layouts.length; i++) {
      const color = this.sassService.readProperty(this.layouts[i].grade? "--color-" + this.layouts[i].grade: "white");
      console.log(color);
      this.map.addPin({
        lat: this.layouts[i].coordinates.lat,
        lng: this.layouts[i].coordinates.lng,
        svgOptions: { color: color, radius: (1 - 0.1 * this.layouts[i].grade), shape: 'circle' }
      });
    }
  }

  ngAfterViewInit() {
    //get the component element
    this.elementRef.nativeElement.innerHTML = this.map.getSVG({
        radius: 0.22,
        color: this.sassService.readProperty('--theme-main'),
        shape: 'circle'
      });
  }
}
