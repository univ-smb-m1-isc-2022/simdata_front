import { Component, OnInit } from '@angular/core';
import { Layout } from "../../../models/layout";

@Component({
  selector: 'app-page-tracks',
  templateUrl: './page-tracks.component.html',
  styleUrls: ['./page-tracks.component.scss'],
})
export class PageTracksComponent implements OnInit {

  layouts: Layout[] = [];
  constructor() {}

  ngOnInit(): void {}
}
