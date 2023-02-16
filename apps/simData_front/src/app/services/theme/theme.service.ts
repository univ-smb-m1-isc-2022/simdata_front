import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {
    this.toggleTheme(this.getTheme() || 'light');
  }

  getTheme() {
    return localStorage.getItem('theme');
  }

  toggleTheme(choice: string) {
    /**
     * We need to swith the root class to either dark or light
     */
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(choice);
    localStorage.setItem('theme', choice);
  }
}
