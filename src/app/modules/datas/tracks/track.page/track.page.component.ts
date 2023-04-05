import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TrackService} from "../track.service";
import {take} from "rxjs";
import {ZoneService} from "../../../maps/services/zone.service";
import {DataService} from "../../services/data.service";
import {Object} from "../../../sim-data-shared/object/object.model";

@Component({
  selector: 'app-track.page',
  templateUrl: './track.page.component.html',
  styleUrls: ['./track.page.component.scss']
})
export class TrackPageComponent implements OnInit {

  track!:Object;

  constructor(
    private activatedRoute: ActivatedRoute,
    private trackService: TrackService,
    private zoneService: ZoneService,
    private dataService: DataService
  ) {
    let url = this.activatedRoute.snapshot.url;
    let trackName = url[url.length - 1].path;
    this.dataService.getId("track", trackName).pipe(take(1)).subscribe((id: number) => {
      this.dataService.get(id).pipe(take(1)).subscribe((track: Object) => {
        this.track = track;
      });
    });
  }



  ngOnInit(): void {
  }
}
