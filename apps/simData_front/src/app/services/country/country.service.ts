import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  url = "https://restcountries.com/v3.1/";

  headers = {
    //cache save for 1 week
    "Cache-Control": "max-age=604800",
  }
  constructor(
    private http: HttpClient
  ) { }

  getAllCountries(){
    return fetch(this.url + "all");
  }

  getCountriesByContinent(continent: string){
    console.log(this.url + "region/" + continent, this.headers);
    return this.http.get<any[]>(this.url + "region/" + continent, {headers: this.headers});
  }

  getCountryByName(country: string): any {
    return fetch(this.url + "name/" + country)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }
}
