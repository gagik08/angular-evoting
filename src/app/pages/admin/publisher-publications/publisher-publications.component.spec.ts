import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherPublicationsComponent } from './publisher-publications.component';

describe('PublisherPublicationsComponent', () => {
  let component: PublisherPublicationsComponent;
  let fixture: ComponentFixture<PublisherPublicationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublisherPublicationsComponent]
    });
    fixture = TestBed.createComponent(PublisherPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
