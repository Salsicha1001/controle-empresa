import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalsichaHomeComponent } from './salsicha-home.component';

describe('SalsichaHomeComponent', () => {
  let component: SalsichaHomeComponent;
  let fixture: ComponentFixture<SalsichaHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SalsichaHomeComponent]
    });
    fixture = TestBed.createComponent(SalsichaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
