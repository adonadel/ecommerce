import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoListarComponent } from './estado-listar.component';

describe('EstadoListarComponent', () => {
  let component: EstadoListarComponent;
  let fixture: ComponentFixture<EstadoListarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadoListarComponent]
    });
    fixture = TestBed.createComponent(EstadoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
