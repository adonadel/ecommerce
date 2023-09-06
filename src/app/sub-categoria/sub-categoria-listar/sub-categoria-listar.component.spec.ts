import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoriaListarComponent } from './sub-categoria-listar.component';

describe('SubCategoriaListarComponent', () => {
  let component: SubCategoriaListarComponent;
  let fixture: ComponentFixture<SubCategoriaListarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubCategoriaListarComponent]
    });
    fixture = TestBed.createComponent(SubCategoriaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
