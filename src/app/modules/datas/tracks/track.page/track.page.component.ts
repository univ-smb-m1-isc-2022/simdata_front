import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TrackService} from "../track.service";
import {Track} from "../track.model";
import {BehaviorSubject, take} from "rxjs";
import {Dot} from "../../../maps/map.model";
import {world, Zone} from "../../../maps/zone.model";
import {ZoneService} from "../../../maps/services/zone.service";
import {Location} from "../modules/locations/location.model";

@Component({
  selector: 'app-track.page',
  templateUrl: './track.page.component.html',
  styleUrls: ['./track.page.component.scss']
})
export class TrackPageComponent implements OnInit {

  track!:Track;
  dots: Dot[] = [];
  zoneSubject:BehaviorSubject<Zone> = new BehaviorSubject<Zone>(world);

  constructor(
    private activatedRoute: ActivatedRoute,
    private trackService: TrackService,
    private zoneService: ZoneService
  ) {
    let url = this.activatedRoute.snapshot.url;
    let trackName = url[url.length - 1].path;
    this.trackService.getTrack(trackName).pipe().subscribe((track: Track) => {
      this.track = track;
      this.dots = [{
        latitude: this.track.location.coordinates.latitude,
        longitude: this.track.location.coordinates.longitude,
        value: this.trackService.bestGrade(this.track)
      }];
      this.zoneService.defineZone("", this.track.location.country).pipe(take(1)).subscribe((zone: Zone) => {
        console.log(zone);
        this.zoneSubject.next(zone);
      });
    });
  }



  ngOnInit(): void {
  }
  getLocation(): Location {
    //wait for the track to be loaded, then return the location
    return this.track.location;
  }
}
