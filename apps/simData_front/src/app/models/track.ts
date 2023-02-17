import { Layout } from "./layout";
import { Coordinates } from "./coordinates";

export interface Track {

  id: number;
  name: string;
  layouts: Layout[];
  date_created: string;
  date_deleted: string | null;
  coordinates: Coordinates;
}
