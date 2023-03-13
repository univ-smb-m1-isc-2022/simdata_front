import {Coordinates} from "../../core/models/coordinates.model";

export interface Layout {
  id: number;
  track_id: number;
  name: string;
  grade: number;
  length: number;
  date_created: string;
  date_deleted: string | null;
}
