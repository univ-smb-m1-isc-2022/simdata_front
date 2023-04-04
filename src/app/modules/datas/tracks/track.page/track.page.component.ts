import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TrackService} from "../track.service";
import {Track} from "../track.model";

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

  ngOnInit(): void {
    let trackName = this.activatedRoute.snapshot.url[1].path;
    console.log(trackName);
    this.trackService.getTrack(trackName).subscribe(track => {
      this.track = track;
    });
  }
}
