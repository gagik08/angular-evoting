import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReferendumComponent } from './add-referendum.component';

describe('AddReferendumComponent', () => {
  let component: AddReferendumComponent;
  let fixture: ComponentFixture<AddReferendumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddReferendumComponent]
    });
    fixture = TestBed.createComponent(AddReferendumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
