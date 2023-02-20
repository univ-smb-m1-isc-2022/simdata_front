import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  url = "https://restcountries.com/v3.1/";
  constructor() { }

  getAllCountries(){
    return fetch(this.url + "all");
  }

  getCountriesByContinent(continent: string) : Promise<any[]>{
    console.log(this.url + "region/" + continent)
    return fetch(this.url + "region/" + continent)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  getCountryByName(country: string): any {
    return fetch(this.url + "name/" + country)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }
}
