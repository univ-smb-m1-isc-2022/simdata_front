import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Track} from "../../datas/tracks/track.model";
import {SassHelperService} from "../../core/services/sass-helper/sass-helper.service";
import {world, Zone} from "../zone.model";
import {ZoneService} from "../services/zone.service";
import {BehaviorSubject} from "rxjs";
import {Dot} from "../map.model";

const DottedMap = require('dotted-map').default;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() dots: Dot[] = [];
  @Input() dotsSubject:BehaviorSubject<Dot[]> = new BehaviorSubject<Dot[]>([]);
  @Input() zoneSubject:BehaviorSubject<Zone> = new BehaviorSubject<Zone>(world);
  @Input() zone:Zone = world;
  map: any;

  constructor(
    private elementRef: ElementRef,
    private sassService: SassHelperService
  ) { }

  ngOnInit(): void {
    this.setMap();
    this.zoneSubject.subscribe((zone:Zone) => {
      this.zone = zone;
      this.update();
    });

    this.dotsSubject.subscribe((dots:Dot[]) => {
      this.dots = dots;
      this.update();
    });
  }

  setMap() {
    this.map = new DottedMap({
      height: 90,
      grid: 'vertical',
      countries: this.zone.countries
    });

    for (let i = 0; i < this.dots.length; i++) {
      const color = this.sassService.readProperty(this.dots[i].value ? "--data-" + this.dots[i].value : "white");
      this.map.addPin({
        lat: this.dots[i].latitude,
        lng: this.dots[i].longitude,
        svgOptions: {color: color, radius: (1 - 0.1 * this.dots[i].value), shape: 'circle'}
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
