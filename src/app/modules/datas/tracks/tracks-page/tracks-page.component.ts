import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ZoneService} from "../../../maps/services/zone.service";
import {Card} from "../../../core/models/card.model";
import {world, Zone} from "../../../maps/zone.model";
import {Track} from "../track.model";
import {TrackService} from "../track.service";
import {count} from "rxjs";


@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.scss']
})
export class TracksPageComponent implements OnInit {

  cards: any[] = [];
  zone: Zone = world;

  filteredTracks: any[] = [];

  baseTracks: Track[] = [];

  displayedColumns: string[] = ['name', 'country', 'layouts'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private zoneService: ZoneService,
    private router: Router,
    private trackService: TrackService
  ) { }

  ngOnInit(): void {
    let region:string;
    let country:string;
    this.activatedRoute.queryParams.subscribe(async (params) => {
      region = params['region']?.replace("%20"," ");
      country = params['country']?.replace("%20"," ");
      this.zoneService.defineZone(region, country);
      //filter tracks
      if(country !== undefined){
        this.trackService.getTracksByCountry(country).subscribe((tracks) => {
          this.filteredTracks = tracks;
          this.baseTracks = tracks;
        });
      }
      else if(region !== undefined){
        this.trackService.getTracksByRegion(region).subscribe((tracks) => {
          this.filteredTracks = tracks;
          this.baseTracks = tracks;
        });
      }
      else{
        this.trackService.getTracks().subscribe((tracks) => {
          this.filteredTracks = tracks;
          this.baseTracks = tracks;
        });
      }
    });

    //A chaque fois que la zone change, on récupère les enfants
    this.zoneService.getZone().subscribe(async (zone) => {
      this.zone = zone;
      this.zoneService.getLinks().subscribe(async (links) => {
        this.cards = links;
      });
    });
  }

  selectCard(card: Card){
    const isRegion = this.zoneService.isRegion(card.title);
    if(isRegion){
      this.router.navigate(['/tracks'], { queryParams: { region: card.title } });
    }
    else{
      this.router.navigate(['/tracks'], { queryParams: { country: card.title } });
    }
  }

  applyFilter(filter: KeyboardEvent){
    const filterValue = (filter.target as HTMLInputElement).value;
    if (filterValue === "") {
      this.filteredTracks = this.baseTracks;
      return;
    }
    this.filteredTracks = this.baseTracks.filter((track) => {
      return track.name.toLowerCase().includes(filterValue.toLowerCase());
    });
  }

}
