import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SociologicalSurveyComponent } from './sociological-survey.component';

describe('SociologicalSurveysComponent', () => {
  let component: SociologicalSurveyComponent;
  let fixture: ComponentFixture<SociologicalSurveyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SociologicalSurveyComponent]
    });
    fixture = TestBed.createComponent(SociologicalSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
