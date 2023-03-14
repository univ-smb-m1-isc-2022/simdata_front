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


//TODO: remove this test data
export const trackTest: Track = {
  id: 1,
  name: "Monza",
  layouts: [
    {
      id: 1,
      name: "Grand Prix",
      grade: 1,
      date_created: "2020-01-01",
      date_deleted: null,
      track_id: 1,
      length: 5.793,
    },
    {
      id: 2,
      name: "Oval",
      grade: 3,
      date_created: "2020-01-01",
      date_deleted: null,
      track_id: 1,
      length: 3.793,
    }
  ],
  date_created: "2020-01-01",
  date_deleted: null,
  coordinates: {
    lat: 45.615,
    lng: 9.281
  }
}
