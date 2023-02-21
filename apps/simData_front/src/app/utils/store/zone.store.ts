import { world, Zone } from "../../models/zone";
import { BehaviorSubject } from "rxjs";

export let zoneSubject = new BehaviorSubject<Zone>(world);
