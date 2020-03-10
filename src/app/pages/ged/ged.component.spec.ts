import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GEDComponent } from './ged.component';

describe('GEDComponent', () => {
  let component: GEDComponent;
  let fixture: ComponentFixture<GEDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GEDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GEDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
