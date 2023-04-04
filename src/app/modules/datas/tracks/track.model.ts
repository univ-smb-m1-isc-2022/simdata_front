import {Layout} from "../layouts/layout.model";
import {Coordinates} from "../../core/models/coordinates.model";
import {Location} from "../../maps/zone.model";

export class Track {
  name: string;
  location: Location;
  capacity: number;
  layouts: Layout[];

  constructor(name: string, location: Location, capacity: number, layouts: Layout[]) {
    this.name = name;
    this.location = location;
    this.capacity = capacity;
    this.layouts = layouts;
  }
}
