import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartReferendumComponent } from './start-referendum.component';

describe('StartReferendumComponent', () => {
  let component: StartReferendumComponent;
  let fixture: ComponentFixture<StartReferendumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartReferendumComponent]
    });
    fixture = TestBed.createComponent(StartReferendumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
