import {Layout} from "../layouts/layout.model";
import {Coordinates} from "../../core/models/coordinates.model";

export interface Track {

  id: number;
  name: string;
  layouts: Layout[];
  date_created: string;
  date_deleted: string | null;
  coordinates: Coordinates;
}
