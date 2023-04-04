import {Injectable} from '@angular/core';
import {TypeZone, Zone, regions, world} from "../zone.model";
import {HttpClient} from "@angular/common/http";
import {map, Observable, of} from "rxjs";
import {Coordinates} from "../../core/models/coordinates.model";

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  countryApiurl = "https://restcountries.com/v3.1/";
  cityApiUrl = "https://api.api-ninjas.com/v1/";

  constructor(
    private http: HttpClient,
  ) { }

  defineZone(region:string, country:string) : Observable<Zone> {
    if(region){
      for (let i = 0; i < regions.length; i++) {
        if(regions[i].name === region){
          return of({type: TypeZone.REGION, name: region, countries: regions[i].countries});
        }
      }
      return of(world);
    }
    else if(country){
      return this.getCountryCode(country).pipe(
        map((code) => {
          return {type: TypeZone.COUNTRY, name: country, countries: [code]};
        })
      );
    }
    else{
      return of(world);
    }
  }

  getCountriesByRegion(region: string): Observable<any[]> {
    const headers = { 'Content-Type': 'application/json' };

    return this.http.get(this.countryApiurl + `region/${region}?fields=name,cca3,region`,{headers}).pipe(
      map((data :any) => {
        data.forEach((country:any) => {
          country.name = country.name.common;
        });
        return data;
      })
    );
  }


  getRegions(): Zone[] {
    return regions;
  }

  isRegion(title: string) {
    for (let i = 0; i < regions.length; i++) {
        if(regions[i].name === title){
          return true;
        }
    }
    return false;
  }

  private getCountryCode(country: string) {
    return this.http.get<any[]>(this.countryApiurl + "name/" + country).pipe(
      map((data) => {
        console.log(data[0].cca3);
        return data[0].cca3;
      })
    );
  }

  getCoords(city: string): Observable<Coordinates> {
    const headers = {
      'X-Api-Key': "r2AxCNIEuBt0oCLYovOshA==yjEux5Tqfrdw67XX"
    }
    return this.http.get<any[]>(this.cityApiUrl + "city?name=" + city,{headers}).pipe(
      map((data) => {
        return {
          latitude: data[0].latitude,
          longitude: data[0].longitude};
      })
    );
  }
}
