import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartSociologicalSurveyComponent } from './start-sociological-survey.component';

describe('StartSociologicalSurveyComponent', () => {
  let component: StartSociologicalSurveyComponent;
  let fixture: ComponentFixture<StartSociologicalSurveyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartSociologicalSurveyComponent]
    });
    fixture = TestBed.createComponent(StartSociologicalSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
