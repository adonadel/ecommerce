import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {SubCategoriaService} from "../sub-categoria.service";
import {CategoriaService} from "../../categoria/categoria.service";

@Component({
  selector: 'app-sub-categoria-listar',
  templateUrl: './sub-categoria-listar.component.html',
  styleUrls: ['./sub-categoria-listar.component.scss']
})
export class SubCategoriaListarComponent implements OnInit{
  public dados:Array<any> = [];
  private nomeCategoria:string = '';

  constructor(
    public subCategoria_service:SubCategoriaService,
    public categoria_service: CategoriaService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.subCategoria_service.listar()
    .on('value',(snapshot:any) => {

      this.dados.splice(0,this.dados.length);

      let response = snapshot.val();

      if (response == null) return;

      Object.values( response )
      .forEach(
        async (e:any,i:number) => {
          let categoria:any = await this.categoria_service.getByIndice(e.categoria_id);

          this.dados.push({
            id: e.id,
            nome: e.nome,
            categoria: categoria.nome,
            indice: Object.keys(snapshot.val())[i]
          });
        }
      );
    });
  }

  excluir(key:string, nome:string) {
    if(confirm("Deseja realmente excluir a sub categoria \"" + nome + "\"?")) {
      this.subCategoria_service.excluir(key);
    }
  }

  editar(key:string) {
    this.router.navigate(['/sub-categoria/editar/' + key]);
  }
}
