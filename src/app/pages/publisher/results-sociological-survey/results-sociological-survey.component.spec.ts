import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsSociologicalSurveyComponent } from './results-sociological-survey.component';

describe('ResultsSociologicalSurveyComponent', () => {
  let component: ResultsSociologicalSurveyComponent;
  let fixture: ComponentFixture<ResultsSociologicalSurveyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsSociologicalSurveyComponent]
    });
    fixture = TestBed.createComponent(ResultsSociologicalSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
