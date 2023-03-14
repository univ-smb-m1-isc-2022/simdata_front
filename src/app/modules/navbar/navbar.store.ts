import {BehaviorSubject} from "rxjs";
import {NavBarState} from "./navabar.model";

export var state: BehaviorSubject<NavBarState> = new BehaviorSubject<NavBarState>(NavBarState.STANDARD);
