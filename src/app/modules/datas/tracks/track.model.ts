import {Layout} from "./modules/layouts/layout.model";
import {Location} from "../../core/models/location.model";

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
