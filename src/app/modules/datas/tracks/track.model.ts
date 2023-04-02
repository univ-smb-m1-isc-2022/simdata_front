import {Layout} from "../layouts/layout.model";
import {Coordinates} from "../../core/models/coordinates.model";
import {Location} from "../../maps/zone.model";

export interface Track {
  name: string;
  location: Location;
  capacity: number;
  layouts: Layout[];
}
