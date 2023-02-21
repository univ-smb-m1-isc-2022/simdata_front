import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { SassHelperService } from "../../../services/sass-helper/sass-helper.service";
import { Layout } from "../../../models/layout";
import { Zone } from "../../../models/zone";
import { ZoneService } from "../../../services/zone/zone.service";

const DottedMap = require('dotted-map').default;

@Component({
  selector: 'app-dotted-map',
  templateUrl: './dotted-map.component.html',
  styleUrls: ['./dotted-map.component.scss'],
})
export class DottedMapComponent implements OnInit{

  @Input() zone: Zone = {name: "world", type: "world", dots: []};

  map: any;



  @Input() layouts: Layout[] = [];
  constructor(
    private elementRef: ElementRef,
    private sassService:SassHelperService,
    private zoneService: ZoneService
  ) {

  }

  ngOnInit(): void {
    this.setMap();
    this.zoneService.getZone().subscribe((zone) => {
      this.zone = zone;
      console.log("update");
      this.update();
    });
  }

  //create a method to update the map


  update(): void {
    this.setMap();
    this.show();
  }

  setMap(){
    console.log("dotted zone",this.zone);
    this.map = new DottedMap({
      height: 90,
      grid:'vertical',
      countries: this.zone.dots
    });

    for (let i = 0; i < this.layouts.length; i++) {
      const color = this.sassService.readProperty(this.layouts[i].grade? "--color-" + this.layouts[i].grade: "white");
      console.log(color);
      this.map.addPin({
        lat: this.layouts[i].coordinates.lat,
        lng: this.layouts[i].coordinates.lng,
        svgOptions: { color: color, radius: (1 - 0.1 * this.layouts[i].grade), shape: 'circle' }
      });

      this.elementRef.nativeElement.innerHTML = "";
      this.elementRef.nativeElement.innerHTML = this.map.getSVG({
        radius: 0.22,
        color: this.sassService.readProperty('--primary'),
        shape: 'circle'
      });

    }
  }

  show(){
    this.elementRef.nativeElement.innerHTML = this.map.getSVG({
      radius: 0.22,
      color: this.sassService.readProperty('--primary'),
      shape: 'circle'
    });
  }

  ngAfterViewInit() {
    this.show();
  }
}
