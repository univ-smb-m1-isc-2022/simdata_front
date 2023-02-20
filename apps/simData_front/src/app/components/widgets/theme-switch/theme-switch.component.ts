import { Component, OnInit, ViewChild } from "@angular/core";
import { ThemeService } from "../../../services/theme/theme.service";

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent implements OnInit {

  @ViewChild('buttonElement') buttonElement: any;

  isLight: boolean = false;

  constructor(
    private themeService: ThemeService,
  ) { }

  ngOnInit(): void {
    this.isLight = this.themeService.getTheme() === 'light';

  }

  onChangeToggleTheme() {
    this.isLight = !this.isLight;
    this.themeService.toggleTheme(this.isLight ? 'light' : 'dark');
    this.reflectPreference();
  }

  ngAfterViewInit() {
    this.reflectPreference();
  }

  reflectPreference() {
    this.buttonElement.nativeElement.setAttribute('data-theme', this.isLight ? 'light' : 'dark');
    this.buttonElement.nativeElement.setAttribute('aria-label', this.isLight ? 'light' : 'dark');
  }

}

/*
const storageKey = 'theme-preference'

const onClick = () => {
  // flip current value
  theme.value = theme.value === 'light'
    ? 'dark'
    : 'light'

  setPreference()
}

const getColorPreference = () => {
  if (localStorage.getItem(storageKey))
    return localStorage.getItem(storageKey)
  else
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
}

const setPreference = () => {
  localStorage.setItem(storageKey, theme.value)
  reflectPreference()
}

const reflectPreference = () => {
  document.firstElementChild
    .setAttribute('data-theme', theme.value)

  document
    .querySelector('#theme-toggle')
    ?.setAttribute('aria-label', theme.value)
}

const theme = {
  value: getColorPreference(),
}

// set early so no page flashes / CSS is made aware
reflectPreference()

window.onload = () => {
  // set on load so screen readers can see latest value on the button
  reflectPreference()

  // now this script can find and listen for clicks on the control
  document
    .querySelector('#theme-toggle')
    .addEventListener('click', onClick)
}

// sync with system changes
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({matches:isDark}) => {
    theme.value = isDark ? 'dark' : 'light'
    setPreference()
  })
 */
