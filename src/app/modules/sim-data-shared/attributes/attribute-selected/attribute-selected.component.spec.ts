import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeSelectedComponent } from './attribute-selected.component';

describe('AttributeSelectedComponent', () => {
  let component: AttributeSelectedComponent;
  let fixture: ComponentFixture<AttributeSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributeSelectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributeSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
