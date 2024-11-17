import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastoProjetoComponent } from './gasto-projeto.component';

describe('GastoProjetoComponent', () => {
  let component: GastoProjetoComponent;
  let fixture: ComponentFixture<GastoProjetoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GastoProjetoComponent]
    });
    fixture = TestBed.createComponent(GastoProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
