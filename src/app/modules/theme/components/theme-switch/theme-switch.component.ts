import {Component, OnInit, ViewChild} from '@angular/core';
import {ThemeService} from "../../theme.service";

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
