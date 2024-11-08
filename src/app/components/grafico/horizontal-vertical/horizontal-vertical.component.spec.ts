import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalVerticalComponent } from './horizontal-vertical.component';

describe('HorizontalVerticalComponent', () => {
  let component: HorizontalVerticalComponent;
  let fixture: ComponentFixture<HorizontalVerticalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HorizontalVerticalComponent]
    });
    fixture = TestBed.createComponent(HorizontalVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
