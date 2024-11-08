import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaCategoriaComponent } from './pizza-categoria.component';

describe('PizzaCategoriaComponent', () => {
  let component: PizzaCategoriaComponent;
  let fixture: ComponentFixture<PizzaCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PizzaCategoriaComponent]
    });
    fixture = TestBed.createComponent(PizzaCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
