import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ZoneService} from "../../../maps/services/zone.service";
import {Card} from "../../../card/card.model";
import {world, Zone} from "../../../maps/zone.model";
import {Track} from "../track.model";
import {TrackService} from "../track.service";
import {CardService} from "../../../card/card.service";
import {BehaviorSubject, Observable, Observer, of, take} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {TrackFormComponent} from "../track.form/track.form.component";
import {Dot} from "../../../maps/map.model";
import {AuthService} from "../../../auth/auth.service";
import {User} from "../../../users/user.model";


@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks.page.component.html',
  styleUrls: ['./tracks.page.component.scss']
})
export class TracksPageComponent implements OnInit {

  cards: any[] = [];
  zone: BehaviorSubject<Zone> = new BehaviorSubject<Zone>(world);
  dots: BehaviorSubject<Dot[]> = new BehaviorSubject<Dot[]>([]);
  user: User | null = null;

  filteredTracks: Track[] = [];
  baseTracks: Track[] = [];
  displayedColumns: string[] = ['name', 'country', 'layouts', 'actions'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private zoneService: ZoneService,
    private router: Router,
    private trackService: TrackService,
    private cardService: CardService,
    private dialog: MatDialog,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    let region:string;
    let country:string;
    this.activatedRoute.queryParams.subscribe(async (params) => {
      region = params['region']?.replace("%20"," ");
      country = params['country']?.replace("%20"," ");
      this.zoneService.defineZone(region, country).pipe(take(1)).subscribe((zone:Zone) => {
        this.zone.next(zone);
      });
      //filter tracks
      if (country) {
        this.trackService.getTracksByCountry(country).pipe(take(1)).subscribe(tracks => {
          this.filteredTracks = this.baseTracks = tracks;
          this.cards = [];
          this.defineDots();
        });
      } else if (region) {
        this.trackService.getTracksByRegion(region).pipe(take(1)).subscribe(tracks => {
          this.filteredTracks = this.baseTracks = tracks;
          this.cards = this.cardService.getCardsByTracks(tracks);
          this.defineDots();
        });
      } else {
        this.trackService.getTracks().pipe(take(1)).subscribe(tracks => {
          this.filteredTracks = this.baseTracks = tracks;
          this.cardService.getCardsRegionsByTracks(tracks).pipe(take(1)).subscribe(cards => {
            this.cards = cards;
            this.defineDots();
          });
        });
      }
    });

    this.authService.getUserConnectedObs().subscribe((user) => {
      this.user = user;
    });
  }

  defineDots(){
    this.dots.next([]);
    this.filteredTracks.forEach((track:Track) => {
      this.dots.next(
        this.dots.getValue().concat(
          {
            latitude : track.location.coordinates.latitude,
            longitude : track.location.coordinates.longitude,
            value : this.trackService.bestGrade(track)
          })
      );
    });
  }

  newTrack(){
    let dialogRef = this.dialog.open(TrackFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.trackService.addTrack(result).subscribe((track:Track) => {
          this.baseTracks.push(track);
          this.filteredTracks = this.baseTracks;
          console.log(track);
        });
      }
    });
  }

  selectCard(card: Card){
    const isRegion = this.zoneService.isRegion(card.title);
    if(isRegion){
      this.router.navigate(['/tracks'], { queryParams: { region: card.title } });
    }
    else{
      this.router.navigate(['/tracks'], { queryParams: { country: card.title } });
    }
  }

  applyFilter(filter: KeyboardEvent){
    const filterValue = (filter.target as HTMLInputElement).value;
    if (filterValue === "") {
      this.filteredTracks = this.baseTracks;
      return;
    }
    this.filteredTracks = this.baseTracks.filter((track) => {
      return track.name.toLowerCase().includes(filterValue.toLowerCase());
    });
  }

  editTrack(row: any){
    this.router.navigate(['/tracks', row.name]);
  }

  deleteTrack(track:Track) {
    this.trackService.deleteTrack(track).subscribe(() => {
      this.baseTracks = this.baseTracks.filter((t) => {
        return t.name !== track.name;
      });
      this.filteredTracks = this.filteredTracks.filter((t) => {
        return t.name !== track.name;
      });
    });

  }
}
