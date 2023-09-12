import { Component } from '@angular/core';
import { FormaPagamentoService } from '../../forma-pagamento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forma-pagamento-form',
  templateUrl: './forma-pagamento-form.component.html',
  styleUrls: ['./forma-pagamento-form.component.scss']
})
export class FormaPagamentoFormComponent {
  public nome:string = '';
  public indice:string = '';
  public nextId:number = 0;

  constructor(
    public formaPagamento_service:FormaPagamentoService,
    public activated_route:ActivatedRoute,
    public router:Router
  ) {
    this.activated_route.params.subscribe((params:any) => {
      if(params.indice === undefined)
        return;

      this.formaPagamento_service.ref().child('/' + params.indice).on('value', (snapshot:any) => {
        let dado:any = snapshot.val();
        this.indice = params.indice;
        this.nome = dado.nome;
      });
    });
  }
  salvar() {
    if(this.nome == '') {
      document.querySelector('#nome')?.classList.add('has-errors');
      document.querySelector('#nome')?.setAttribute('tooltip', 'true');
      return;
    }

    if(this.indice === '') {
      this.formaPagamento_service.salvar({
        id : this.nextId > 0 ? this.nextId : 1,
        nome : this.nome
      })
    }else {
      let dados = {
        nome:this.nome
      };
      this.formaPagamento_service.editar(dados, this.indice);
    }
    this.router.navigate(['/forma-pagamento']);
  }

  ngOnInit(): void {
    this.setLastId();
  }

  private setLastId() {
    this.formaPagamento_service.listar()
      .on('value',(snapshot:any) => {

        let response = snapshot.val();

        if (response == null) return;
        Object.values( response )
        .forEach(
          (e:any,i:number) => {
            this.nextId = e.id + 1;
          }
        );
      });
  }
}
