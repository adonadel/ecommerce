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
        (e:any,i:number) => {
          this.setNomeCategoria(e.categoria_id);

          this.dados.push({
            id: e.id,
            nome: e.nome,
            categoria: this.nomeCategoria,
            indice: Object.keys(snapshot.val())[i]
          });
          this.nomeCategoria = '';
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

  private setNomeCategoria(categoria_id:string) {
    this.categoria_service.getByIndice(categoria_id)
      .on('value',(snapshot:any) => {
        let response = snapshot.val();

        if (response == null) return;

        this.nomeCategoria = response.nome;
      });
  }
}
