import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ProdutoService} from "../produto.service";

@Component({
  selector: 'app-produto-listar',
  templateUrl: './produto-listar.component.html',
  styleUrls: ['./produto-listar.component.scss']
})
export class ProdutoListarComponent {
  public dados:Array<any> = [];

  constructor(
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
        (e:any,i:number) => {
          this.dados.push({
            id: e.id,
            nome: e.nome,
            indice: Object.keys(snapshot.val())[i]
          });
        }
      );
    });
  }

  excluir(key:string, nome:string) {
    if(confirm("Deseja realmente excluir a forma de pagamento \"" + nome + "\"?")) {
      this.produtoService.excluir(key);
    }
  }

  editar(key:string) {
    this.router.navigate(['/forma-pagamento/editar/' + key]);
  }
}
