import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DottedMapComponent } from './dotted-map.component';

describe('DottedMapComponent', () => {
  let component: DottedMapComponent;
  let fixture: ComponentFixture<DottedMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DottedMapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DottedMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
