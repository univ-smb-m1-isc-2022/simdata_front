import { Injectable } from '@angular/core';
import { apiUrl} from "../../../global";
import {Observable} from "rxjs";
import {Track} from "./track.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(
    private http: HttpClient
  ) { }


  getTracks():Observable<Track[]> {
    return this.http.get<Track[]>(`${apiUrl}/tracks`);
  }

  getTracksByCountry(country:string):Observable<Track[]> {
    return this.http.get<Track[]>(`${apiUrl}/tracks/location/country/${country}`);
  }

  getTracksByRegion(region:string):Observable<Track[]> {
    return this.http.get<Track[]>(`${apiUrl}/tracks/location/region/${region}`);
  }

  addTrack(track: Track) :Observable<Track> {
    return this.http.post<Track>(`${apiUrl}/track`, track);
  }
}
