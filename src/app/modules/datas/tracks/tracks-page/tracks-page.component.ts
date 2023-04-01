import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ZoneService} from "../../../maps/services/zone.service";
import {Card} from "../../../widgets/card/card.model";
import {world, Zone} from "../../../maps/zone.model";
import {Track} from "../track.model";
import {TrackService} from "../track.service";
import {CardService} from "../../../widgets/card/card.service";
import {BehaviorSubject} from "rxjs";


@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.scss']
})
export class TracksPageComponent implements OnInit {

  cards: any[] = [];
  zone: BehaviorSubject<Zone> = new BehaviorSubject<Zone>(world);

  filteredTracks: any[] = [];

  baseTracks: Track[] = [];

  displayedColumns: string[] = ['name', 'country', 'layouts'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private zoneService: ZoneService,
    private router: Router,
    private trackService: TrackService,
    private cardService: CardService
  ) {}

  ngOnInit(): void {
    let region:string;
    let country:string;
    this.activatedRoute.queryParams.subscribe(async (params) => {
      region = params['region']?.replace("%20"," ");
      country = params['country']?.replace("%20"," ");
      this.zoneService.defineZone(region, country).subscribe((zone:Zone) => {
        this.zone.next(zone);
      });
      //filter tracks
      if (country) {
        this.trackService.getTracksByCountry(country).subscribe(tracks => {
          this.filteredTracks = this.baseTracks = tracks;
          this.cards = [];
        });
      } else if (region) {
        this.trackService.getTracksByRegion(region).subscribe(tracks => {
          this.filteredTracks = this.baseTracks = tracks;
          this.cards = this.cardService.getCardsByTracks(tracks);
        });
      } else {
        this.trackService.getTracks().subscribe(tracks => {
          this.filteredTracks = this.baseTracks = tracks;
          this.cardService.getCardsRegionsByTracks(tracks).subscribe(cards => {
            this.cards = cards;
          });
        });
      }
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
