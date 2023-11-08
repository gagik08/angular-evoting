import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferendumsComponent } from './referendums.component';

describe('ReferendumsComponent', () => {
  let component: ReferendumsComponent;
  let fixture: ComponentFixture<ReferendumsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReferendumsComponent]
    });
    fixture = TestBed.createComponent(ReferendumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
