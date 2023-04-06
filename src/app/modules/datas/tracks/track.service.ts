import { Injectable } from '@angular/core';
import { apiUrl} from "../../../global";
import {Observable} from "rxjs";
import {Track} from "./track.model";
import {HttpClient} from "@angular/common/http";
import {Layout} from "./modules/layouts/layout.model";
import {CookieService} from "../../core/services/cookie/cookie.service";

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
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
    const token = this.cookieService.get('auth-token');
    if (!token) {
      throw new Error('Token not found');
    }
    return this.http.post<Track>(`${apiUrl}/track`, {'track' : track, 'token': token});
  }

  getTrack(name:string):Observable<Track> {
    return this.http.get<Track>(`${apiUrl}/tracks/${name}`);
  }

  bestGrade(track: Track): number {
    return track.layouts.reduce((best, layout) : Layout => {
      return layout.grade < best.grade ? layout : best;
    }).grade;
  }

  deleteTrack(track: Track) {
    return this.http.delete(`${apiUrl}/track/${track.name}`);
  }
}
