import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorListarComponent } from './fornecedor-listar.component';

describe('FornecedorListarComponent', () => {
  let component: FornecedorListarComponent;
  let fixture: ComponentFixture<FornecedorListarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FornecedorListarComponent]
    });
    fixture = TestBed.createComponent(FornecedorListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
