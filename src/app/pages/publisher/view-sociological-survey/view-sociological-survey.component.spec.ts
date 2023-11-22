import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSociologicalSurveyComponent } from './view-sociological-survey.component';

describe('ViewSociologicalSurveyComponent', () => {
  let component: ViewSociologicalSurveyComponent;
  let fixture: ComponentFixture<ViewSociologicalSurveyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSociologicalSurveyComponent]
    });
    fixture = TestBed.createComponent(ViewSociologicalSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
