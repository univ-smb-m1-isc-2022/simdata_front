import {Coordinates} from "../../../../core/models/coordinates.model";

export interface Location{
  coordinates: Coordinates;
  city: string;
  country: string;
  region: string;
}
