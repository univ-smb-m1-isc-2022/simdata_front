import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { SassHelperService } from "../../../services/sass-helper/sass-helper.service";

const DottedMap = require('dotted-map').default;

@Component({
  selector: 'app-dotted-map',
  templateUrl: './dotted-map.component.html',
  styleUrls: ['./dotted-map.component.scss'],
})
export class DottedMapComponent implements OnInit {

  map: any;
  constructor(
    private elementRef: ElementRef,
    private sassService:SassHelperService
  ) {
    this.map = new DottedMap({
      height: 60,
      grid:'diagonal'
    });

    this.map.addPin({
      lat: 40.73061,
      lng: -73.935242,
      svgOptions: { color: '#d6ff79', radius: 0.4 },
    });
    this.map.addPin({
      lat: 48.8534,
      lng: 2.3488,
      svgOptions: { color: '#fffcf2', radius: 0.4 },
    });
  }

  ngOnInit(): void {




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
