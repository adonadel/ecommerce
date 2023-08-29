import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-listar',
  templateUrl: './categoria-listar.component.html',
  styleUrls: ['./categoria-listar.component.scss']
})
export class CategoriaListarComponent implements OnInit{
  public dados:Array<any> = [];

  constructor(
    public categoria_service:CategoriaService
  ) {}

  ngOnInit(): void {
    this.categoria_service.listar().on('value', (snapShot:any) => {
      this.dados = Object.values(snapShot.val());
    });
  }


}
