import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Track} from "../../datas/tracks/track.model";
import {SassHelperService} from "../../core/services/sass-helper/sass-helper.service";
import {world, Zone} from "../zone.model";
import {ZoneService} from "../services/zone.service";

const DottedMap = require('dotted-map').default;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() tracks: Track[] = [];
  @Input() zone: Zone = world;
  map: any;

  constructor(
    private elementRef: ElementRef,
    private sassService: SassHelperService,
    private zoneService: ZoneService
  ) { }

  ngOnInit(): void {
    this.setMap();
    this.zoneService.getZone().subscribe(async (zone) => {
      this.zone = zone;
      this.update();
    });
  }

  setMap() {
    this.map = new DottedMap({
      height: 90,
      grid: 'vertical',
      countries: this.zone.countries
    });

    for (let i = 0; i < this.tracks.length; i++) {
      const layout = this.tracks[i].layouts[0];
      const color = this.sassService.readProperty(layout.grade ? "--data-" + layout.grade : "white");
      console.log(color);
      this.map.addPin({
        lat: this.tracks[i].latitude,
        lng: this.tracks[i].longitude,
        svgOptions: {color: color, radius: (1 - 0.1 * layout.grade), shape: 'circle'}
      });
    }

      this.elementRef.nativeElement.innerHTML = "";
      this.elementRef.nativeElement.innerHTML = this.map.getSVG({
        radius: 0.22,
        color: this.sassService.readProperty('--primary'),
        shape: 'circle'
      });


  }

  update(): void {
    this.setMap();
    this.show();
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
