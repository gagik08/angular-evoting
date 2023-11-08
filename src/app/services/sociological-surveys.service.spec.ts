import { TestBed } from '@angular/core/testing';

import { SociologicalSurveyService } from './sociological-survey.service';

describe('SociologicalSurveysService', () => {
  let service: SociologicalSurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SociologicalSurveyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
