import {BehaviorSubject} from "rxjs";
import {User} from "../users/user.model";

export let userConnectedSubject = new BehaviorSubject<User|null>(null);
