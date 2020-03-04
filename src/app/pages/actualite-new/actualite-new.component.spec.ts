import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualiteNewComponent } from './actualite-new.component';

describe('ActualiteNewComponent', () => {
  let component: ActualiteNewComponent;
  let fixture: ComponentFixture<ActualiteNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualiteNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualiteNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
