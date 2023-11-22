import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsReferendumComponent } from './results-referendum.component';

describe('ResultsReferendumComponent', () => {
  let component: ResultsReferendumComponent;
  let fixture: ComponentFixture<ResultsReferendumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsReferendumComponent]
    });
    fixture = TestBed.createComponent(ResultsReferendumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
