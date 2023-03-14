import {BehaviorSubject, Subject} from "rxjs";
import { Zone, world} from "./zone.model";

export var zoneSubject = new BehaviorSubject<Zone>(world);
