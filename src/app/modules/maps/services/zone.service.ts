import {Injectable} from '@angular/core';
import {zoneSubject} from "../zone.store";
import {TypeZone, Zone, regions, world} from "../zone.model";
import {Card} from "../../core/models/card.model";
import {HttpClient} from "@angular/common/http";
import {map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  url = "https://restcountries.com/v3.1/";

  constructor(
    private http: HttpClient,
  ) { }


  getZone() {
    return zoneSubject.asObservable();
  }

  setZone(zone:Zone) {
    zoneSubject.next(zone);
  }

  defineZone(region:string, country:string) {
    if(region){
      for (let i = 0; i < regions.length; i++) {
        if(regions[i].name === region){
          this.setZone(regions[i]);
          return;
        }
      }
    }
    else if(country){
      this.getCountryCode(country).subscribe((code:string) => {
        this.setZone({type: TypeZone.COUNTRY, name: country, countries: [code]});
      });
    }
    else{
      this.setZone(world);
    }
  }

  getLinks(): Observable<Card[]>{
    const zone = zoneSubject.getValue();
    const links: Card[] = [];
    if(zone.type === TypeZone.WORLD){
      //add continents
      for (let i = 0; i < regions.length; i++) {
        links.push({title: regions[i].name, data: 0});
      }
      return of(links);
    }
    else if(zone.type === TypeZone.REGION){
      //add countries
      return this.getRegionCountries(zone.name).pipe(
        map((data) => {
          for (let i = 0; i < data.length; i++) {
            links.push({title: data[i].name.common, data: 0});
          }
          return links;
        })
      );
    }
    else if(zone.type === TypeZone.COUNTRY){
      for (let i = 0; i < regions.length; i++) {
        links.push({title: regions[i].name, data: 0});
      }
      return of(links);
    }
    else{
      return of(links);
    }
  }

  isRegion(title: string) {
    for (let i = 0; i < regions.length; i++) {
        if(regions[i].name === title){
          return true;
        }
    }
    return false;
  }

  getRegionCountries(region: string) {
    const headers = {
      //cache save for 1 week
      "Cache-Control": "max-age=604800",
    }
    return this.http.get<any[]>(this.url + "region/" + region, {headers: headers});
  }

  private getCountryCode(country: string) {
    return this.http.get<any[]>(this.url + "name/" + country).pipe(
      map((data) => {
        console.log(data[0].cca3);
        return data[0].cca3;
      })
    );
  }

  public countryInRegion(country: string, region: string): Observable<boolean> {
    return this.getRegionCountries(region).pipe(
      map((data) => {
        for (let i = 0; i < data.length; i++) {
          if(data[i].name.common === country){
            return true;
          }
        }
        return false;
      })
    );
  }
}
