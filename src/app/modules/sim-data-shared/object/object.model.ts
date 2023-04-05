import {Attribute} from "../attributes/attribute.model";

export interface Object{
  id: number;
  type: string;
  realType: string;
  attributes: Attribute[];
  value: any;
}
