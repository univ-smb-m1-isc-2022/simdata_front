import {Layout} from "../layouts/layout.model";
import {Coordinates} from "../../core/models/coordinates.model";

export interface Track {

  id: number;
  name: string;
  country: string;
  layouts: Layout[];
  latitude: number;
  longitude: number;
}


//TODO: remove this test data
export const trackTest: Track = {
  id: 1,
  name: "Monza",
  country: "Italy",
  latitude: 45.6156,
  longitude: 9.2811,
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
}
