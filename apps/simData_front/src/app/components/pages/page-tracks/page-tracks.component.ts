import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Layout } from "../../../models/layout";
import { ActivatedRoute, Router } from "@angular/router";
import { Card } from "../../../models/card";
import { CountryService } from "../../../services/country/country.service";
import { Zone } from "../../../models/zone";
import { ZoneService } from "../../../services/zone/zone.service";

@Component({
  selector: 'app-page-tracks',
  templateUrl: './page-tracks.component.html',
  styleUrls: ['./page-tracks.component.scss'],
})
export class PageTracksComponent implements OnInit {

  @ViewChild("dottedMapComponent") dottedMapComponent: ElementRef;
  childs: Card[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private zoneService: ZoneService,
    private router: Router
  ) {}


  ngOnInit(): void {



    let continent:string;
    let country:string;
    this.activatedRoute.queryParams.subscribe(async (params) => {
      continent = params['continent']?.replace("%20"," ");
      country = params['country']?.replace("%20"," ");
      await this.zoneService.defineZone(continent, country);
    });

    //A chaque fois que la zone change, on récupère les enfants
    this.zoneService.getZone().subscribe(async (zone) => {
      this.childs = await this.zoneService.getChilds();
    });

  }

  onCardChildClicked(child: Card) {
    const isContinent = this.zoneService.isContinent(child.title);
    if(isContinent){
      this.router.navigate(['/tracks'], { queryParams: { continent: child.title } });
    }
    else{
      this.router.navigate(['/tracks'], { queryParams: { country: child.title } });
    }
  }
}
