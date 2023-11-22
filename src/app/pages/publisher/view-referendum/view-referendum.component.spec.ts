import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReferendumComponent } from './view-referendum.component';

describe('ViewReferendumComponent', () => {
  let component: ViewReferendumComponent;
  let fixture: ComponentFixture<ViewReferendumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewReferendumComponent]
    });
    fixture = TestBed.createComponent(ViewReferendumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
