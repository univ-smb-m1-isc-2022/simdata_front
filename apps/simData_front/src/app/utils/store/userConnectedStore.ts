import { BehaviorSubject } from "rxjs";
import { User } from "../../models/user";

export let userConnectedSubject = new BehaviorSubject<User|null>(null);
