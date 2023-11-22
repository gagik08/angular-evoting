import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSociologicalSurveyComponent } from './add-sociological-survey.component';

describe('AddSociologicalSurveyComponent', () => {
  let component: AddSociologicalSurveyComponent;
  let fixture: ComponentFixture<AddSociologicalSurveyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSociologicalSurveyComponent]
    });
    fixture = TestBed.createComponent(AddSociologicalSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
