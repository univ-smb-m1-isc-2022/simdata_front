import {Coordinates} from "../../../../core/models/coordinates.model";

export interface Layout {
  name: string;
  grade: number;
  tags: string[];
  surface: string[];
  length: number;
  turns: number;
  constructionYear: number;
  destructionYear: number;
}
