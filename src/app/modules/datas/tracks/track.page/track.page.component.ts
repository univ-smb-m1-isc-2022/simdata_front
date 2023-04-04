import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TrackService} from "../track.service";
import {Track} from "../track.model";
import {take} from "rxjs";
import {Dot} from "../../../maps/map.model";

@Component({
  selector: 'app-track.page',
  templateUrl: './track.page.component.html',
  styleUrls: ['./track.page.component.scss']
})
export class TrackPageComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private trackService: TrackService,
  ) { }

  track:Track|null = null;
  dots: Dot[] = [];

  ngOnInit(): void {
    let url = this.activatedRoute.snapshot.url;
    let trackName = url[url.length-1].path;

    console.log(trackName);
    this.trackService.getTrack(trackName).pipe(take(1)).subscribe(track => {
      this.track = track;
      this.dots = [{
        latitude: track.location.coordinates.latitude,
        longitude: track.location.coordinates.longitude,
        value: this.trackService.bestGrade(track)
      }]
    });
  }
}
