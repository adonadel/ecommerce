import { Component } from '@angular/core';
import {ClienteService} from "../cliente.service";
import {Router} from "@angular/router";
import { IConfig } from 'ngx-mask';

@Component({
  selector: 'app-cliente-listar',
  templateUrl: './cliente-listar.component.html',
  styleUrls: ['./cliente-listar.component.scss']
})
export class ClienteListarComponent {
  public dados:Array<any> = [];

  constructor(
    public clienteService:ClienteService,
    public router:Router
  ) { }

  ngOnInit(): void {

    this.clienteService.listar()
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
            email: e.email,
            cpf: e.cpf,
            data_nasc: e.data_nasc,
            celular: e.celular,
            indice: Object.keys(snapshot.val())[i]
          });
        }
      );
    });
  }

  excluir(key:string, nome:string) {
    if(confirm("Deseja realmente excluir o cliente \"" + nome + "\"?")) {
      this.clienteService.excluir(key);
    }
  }

  editar(key:string) {
    this.router.navigate(['/cliente/editar/' + key]);
  }
}
