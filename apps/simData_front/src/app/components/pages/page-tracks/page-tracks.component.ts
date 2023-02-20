import { Component, OnInit } from '@angular/core';
import { Layout } from "../../../models/layout";
import { ActivatedRoute } from "@angular/router";
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

  layouts: Layout[] = [];
  zone: Zone;
  childs: Card[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private zoneService: ZoneService
  ) {}


  ngOnInit(): void {
    let continent:string;
    let country:string;
    this.activatedRoute.queryParams.subscribe(async (params) => {
      continent = params['continent'];
      country = params['country'];
      this.zone = await this.zoneService.defineZone(continent, country);
      console.log("zone",this.zone);
      this.childs = await this.getChilds();
    });

  }



  async getChilds(): Promise<Card[]> {
      if (this.zone.type === "world") {
        return [
          { title: "Africa", data: 60 },
          { title: "America", data: 256 },
          { title: "Asia", data: 69 },
          { title: "Europe", data: 420 },
          { title: "Oceania", data: 0 },
        ];
      }
      if (this.zone.type === "continent") {
        const countries = await this.countryService.getCountriesByContinent(
          this.zone.name
        );
        return countries.map((country) => {
          return { title: country.name.common, data: 0 };
        });
      }
      if (this.zone.type === "country") {
        return [
          { title: "Africa", data: 60 },
          { title: "America", data: 256 },
          { title: "Asia", data: 69 },
          { title: "Europe", data: 420 },
          { title: "Oceania", data: 0 },
        ];
      }
      else{
        return [];
      }
  }
}
