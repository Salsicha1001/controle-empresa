import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LucroTableComponent } from './lucro-table.component';

describe('LucroTableComponent', () => {
  let component: LucroTableComponent;
  let fixture: ComponentFixture<LucroTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LucroTableComponent]
    });
    fixture = TestBed.createComponent(LucroTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
