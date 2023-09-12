import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProdutoService} from "../produto.service";
import {CategoriaService} from "../../categoria/categoria.service";
import {SubCategoriaService} from "../../sub-categoria/sub-categoria.service";

@Component({
  selector: 'app-produto-listar',
  templateUrl: './produto-listar.component.html',
  styleUrls: ['./produto-listar.component.scss']
})
export class ProdutoListarComponent implements OnInit{
  public dados:Array<any> = [];

  constructor(
    public categoriaService: CategoriaService,
    public subCategoriaService:SubCategoriaService,
    public produtoService:ProdutoService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.produtoService.listar()
    .on('value',(snapshot:any) => {

      this.dados.splice(0,this.dados.length);

      let response = snapshot.val();

      if (response == null) return;

      Object.values( response )
      .forEach(
        async (e:any,i:number) => {
          let categoria:any = await this.categoriaService.getByIndice(e.categoria_id);
          let subcategoria:any = await this.subCategoriaService.getByIndice(e.subcategoria_id);

          this.dados.push({
            id: e.id,
            nome: e.nome,
            categoria: categoria.nome,
            subcategoria: subcategoria.nome,
            indice: Object.keys(snapshot.val())[i]
          });
        }
      );
    });
  }

  excluir(key:string, nome:string) {
    if(confirm("Deseja realmente excluir o produto \"" + nome + "\"?")) {
      this.produtoService.excluir(key);
    }
  }

  editar(key:string) {
    this.router.navigate(['/produto/editar/' + key]);
  }
}
