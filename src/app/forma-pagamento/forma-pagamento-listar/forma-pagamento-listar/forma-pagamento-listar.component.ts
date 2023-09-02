import { Component, OnInit } from '@angular/core';
import { FormaPagamentoService } from '../../forma-pagamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forma-pagamento-listar',
  templateUrl: './forma-pagamento-listar.component.html',
  styleUrls: ['./forma-pagamento-listar.component.scss']
})
export class FormaPagamentoListarComponent implements OnInit{
  public dados:Array<any> = [];

  constructor(
    public formaPagamento_service:FormaPagamentoService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.formaPagamento_service.listar()
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
      this.formaPagamento_service.excluir(key);
    }
  }

  editar(key:string) {
    this.router.navigate(['/forma-pagamento/editar/' + key]);
  }
}