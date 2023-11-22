import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterSubscriptionsComponent } from './voter-subscriptions.component';

describe('VoterSubscriptionsComponent', () => {
  let component: VoterSubscriptionsComponent;
  let fixture: ComponentFixture<VoterSubscriptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoterSubscriptionsComponent]
    });
    fixture = TestBed.createComponent(VoterSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
