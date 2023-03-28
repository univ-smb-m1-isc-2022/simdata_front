import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ZoneService} from "../../../maps/services/zone.service";
import {Card} from "../../../core/models/card.model";
import {world, Zone} from "../../../maps/zone.model";


@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.scss']
})
export class TracksPageComponent implements OnInit {

  cards: any[] = [];
  zone: Zone = world;

  filteredTracks: any[] = [];

  displayedColumns: string[] = ['name'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private zoneService: ZoneService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let continent:string;
    let country:string;
    this.activatedRoute.queryParams.subscribe(async (params) => {
      continent = params['region']?.replace("%20"," ");
      country = params['country']?.replace("%20"," ");
      this.zoneService.defineZone(continent, country);
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
    console.log(filter);
    console.log((filter.target as HTMLInputElement).value);
  }

}
