import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTracksComponent } from './page-tracks.component';

describe('PageTracksComponent', () => {
  let component: PageTracksComponent;
  let fixture: ComponentFixture<PageTracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageTracksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
