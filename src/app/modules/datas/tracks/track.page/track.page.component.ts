import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TrackService} from "../track.service";
import {Track} from "../track.model";
import {async} from "rxjs";

@Component({
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
    let trackName = this.activatedRoute.snapshot.url[0].path;
    this.trackService.getTrack(trackName).subscribe(track => {
      this.track = track;
    });
  }

  protected readonly async = async;
}
