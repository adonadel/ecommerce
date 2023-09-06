import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoriaFormComponent } from './sub-categoria-form.component';

describe('SubCategoriaFormComponent', () => {
  let component: SubCategoriaFormComponent;
  let fixture: ComponentFixture<SubCategoriaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubCategoriaFormComponent]
    });
    fixture = TestBed.createComponent(SubCategoriaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
