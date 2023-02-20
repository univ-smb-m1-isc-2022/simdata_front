import { Injectable } from '@angular/core';
import { Zone } from "../../models/zone";
import { CountryService } from "../country/country.service";
import { json } from "@angular-devkit/core";

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


  defineZone(continent: string, country: string): Promise<Zone> {
    return new Promise(async (resolve, reject) => {
      if (!continent && !country) {
        resolve({ type: "world", name: "World", dots: [] });
      }
      if (continent) {
        resolve({ type: "continent", name: continent, dots: this.getDots(continent) });
      }
      if (country) {
        await this.getDot(country).then((data: any) => {
          resolve({ type: "country", name: country, dots: data });
        });
      } else {
        reject("No continent or country defined");
      }
    });
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
}
