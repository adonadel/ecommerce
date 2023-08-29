import { Component } from '@angular/core';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.scss']
})
export class CategoriaFormComponent {
  public id:number = 0;
  public nome:string = '';

  constructor(
    public categoria_service:CategoriaService
  ) { }

  salvar() {
    this.categoria_service.salvar({
      nome : this.nome
    })
  }
}
