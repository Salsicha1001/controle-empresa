import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjetoComponent } from './add-projeto.component';

describe('AddProjetoComponent', () => {
  let component: AddProjetoComponent;
  let fixture: ComponentFixture<AddProjetoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddProjetoComponent]
    });
    fixture = TestBed.createComponent(AddProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
