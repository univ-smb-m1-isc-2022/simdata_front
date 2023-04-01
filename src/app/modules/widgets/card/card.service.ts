import { Injectable } from '@angular/core';
import {Track} from "../../datas/tracks/track.model";
import {Card} from "./card.model";
import {ZoneService} from "../../maps/services/zone.service";
import {Zone} from "../../maps/zone.model";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    private zoneService:ZoneService
  ) { }


  getCardsByTracks(tracks: Track[]) {
    let cards:Card[] = [];
    for(let track of tracks){
      //check if the country of the track is already in the cards
      let found = false;
      for(let card of cards){
        if(card.title === track.country){
          found = true;
          card.data++;
        }
      }
      if(!found){
        cards.push({title: track.country, data: 1});
      }
    }
    return cards.sort((a,b) => b.data - a.data);
  }

  getCardsRegionsByTracks(tracks: Track[]):Observable<any[]> {
    let result:Card[] = [];
    let regions:Zone[] = this.zoneService.getRegions();
    for(let i = 0; i < regions.length; i++){
      result.push({title: regions[i].name, data: 0});
      this.zoneService.getCountriesByRegion(regions[i].name).subscribe(countries => {
        for(let country of countries){
          for(let track of tracks){
            if(track.country === country.name){
              result[i].data++;
            }
          }
        }
      })
    }
    //return result order by data desc
    return of(result.sort((a,b) => b.data - a.data));
  }
}
