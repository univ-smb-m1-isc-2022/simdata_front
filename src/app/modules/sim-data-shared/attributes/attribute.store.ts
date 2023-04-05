import {BehaviorSubject, Subject} from "rxjs";
import {Attribute} from "./attribute.model";

export let attributeSelected: BehaviorSubject<Attribute | null> = new BehaviorSubject<Attribute | null>(null);
