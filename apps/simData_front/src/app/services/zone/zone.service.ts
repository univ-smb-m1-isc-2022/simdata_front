import { Injectable } from '@angular/core';
import { world, Zone } from "../../models/zone";
import { CountryService } from "../country/country.service";
import { zoneSubject } from "../../utils/store/zone.store";
import { Observable } from "rxjs";
import { Card } from "../../models/card";


//TODO: clean un peu tout ces services et faire des stores plus propre
@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  constructor(
    private countryService: CountryService
  ) { }

  world = {
    europe : [
    "ALB", "AUT", "BLR", "BEL", "BIH", "BGR", "HRV", "CYP", "CZE", "DNK", "EST",
    "FIN", "FRA", "DEU", "GRC", "HUN", "ISL", "IRL", "ITA", "KAZ", "LVA", "LTU",
    "LUX", "MKD", "MLT", "MDA", "MNE", "NLD", "POL", "PRT", "ROU",
    "SRB", "SVK", "SVN", "ESP", "SWE", "CHE", "UKR", "GBR", "NOR", "RUS"
  ],

    americas : [
    "ARG", "BHS", "BLZ", "BMU", "BOL", "BRA", "CAN", "CHL",
    "COL", "CRI", "CUB", "DOM", "ECU", "SLV", "GRL", "GTM",
    "GUY", "HTI", "HND", "JAM", "MEX", "NIC", "PAN", "PRY", "PER", "PRI",
    "SUR", "TTO", "USA", "URY", "VEN"
  ],

    asia : [
    "AFG", "ARM", "AZE","BGD", "BTN", "BRN", "KHM", "CHN",
    "GEO", "IND", "IDN", "IRN", "IRQ", "ISR", "JPN", "JOR", "KAZ", "KWT", "KGZ",
    "LAO", "LBN", "MKD", "MYS", "MNG", "MMR", "NPL", "PRK", "OMN", "PAK", "PSE",
    "PHL", "QAT", "SAU", "KOR", "LKA", "SYR", "TWN", "TJK", "THA", "TUR", "TKM",
    "ARE", "UZB", "VNM", "YEM"
  ],

    africa : [
    "DZA", "AGO", "BEN", "BWA", "BFA", "BDI", "CMR", "CAF", "TCD",
    "COG", "COD", "DJI", "EGY", "GNQ", "ERI", "ETH", "GAB", "GMB", "GHA", "GIN", "GNB",
    "CIV", "KEN", "LSO", "LBR", "LBY", "MDG", "MWI", "MLI", "MRT", "MAR",
    "MOZ", "NAM", "NER", "NGA", "RWA", "SEN", "SLE", "SOM", "ZAF",
    "SSD", "SDN", "SWZ", "TZA", "TGO", "TUN", "UGA", "ZMB", "ZWE","ESH"
  ]
  }

  getZoneValue(): Zone {
    return zoneSubject.value;
  }

  getZone(): Observable<Zone>{
    return zoneSubject.asObservable();
  }

  async defineZone(continent: string, country: string){
    if (!continent && !country) {
      zoneSubject.next(world);
    }
    if (continent) {
      let res = { type: "continent", name: continent, dots: this.getDots(continent) };
      zoneSubject.next(res);
    }
    if (country) {
      await this.getDot(country).then((data: any) => {
        let res = { type: "country", name: country, dots: data };
        zoneSubject.next(res);
      });
    }
  }

  getDot(country: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.countryService.getCountryByName(country).then((data: any) => {
        resolve([data[0].cca3]);
      });
    });
  }

  getDots(continent: string): string[] {
    for (let key in this.world) {
      if (key === continent) {
        return this.world[key as keyof typeof this.world];
      }
    }
    return [];
  }

  async getChilds(): Promise<Card[]> {
    const zone = this.getZoneValue();
    if (zone.type === "world") {
      return [
        { title: "africa", data: 60},
        { title: "americas", data: 256 },
        { title: "asia", data: 69},
        { title: "europe", data: 420},
        { title: "oceania", data: 0},
      ];
    }
    if (zone.type === "continent") {
      this.countryService.getCountriesByContinent(
        zone.name
      ).subscribe((data: any) => {
        for (let i = 0; i < data.length; i++) {
          data[i] = { title: data[i].name.common, data: data[i].population.total };
        }
        return data;
      });
    }
    if (zone.type === "country") {
      return [
        { title: "africa", data: 60},
        { title: "americas", data: 256 },
        { title: "asia", data: 69},
        { title: "europe", data: 420},
        { title: "oceania", data: 0},
      ];
    } else {
      return [];
    }
  }

  isContinent(title: string) {
    return !!this.world[title as keyof typeof this.world];
  }
}
