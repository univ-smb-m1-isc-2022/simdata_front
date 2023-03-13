import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SassHelperService {

  constructor() { }

  readProperty(name: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(name);
  }
}
