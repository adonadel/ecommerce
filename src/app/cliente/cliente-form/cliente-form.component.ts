import { Component } from '@angular/core';
import {ClienteService} from "../cliente.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent {
  public nome:string = '';
  public email:string = '';
  public password:string = '';
  public indice:string = '';
  public celular:string = '';
  public cpf:string = '';
  public data_nasc:Date = new Date();
  public nextId:number = 0;

  constructor(
    public clienteService:ClienteService,
    public activated_route:ActivatedRoute,
    public router:Router
  ) {
    this.activated_route.params.subscribe((params:any) => {
      if(params.indice === undefined)
        return;

      this.clienteService.ref().child('/' + params.indice).on('value', (snapshot:any) => {
        let dado:any = snapshot.val();
        this.indice = params.indice;
        this.nome = dado.nome;
        this.email = dado.email;
        this.cpf = dado.cpf;
        this.data_nasc = dado.data_nasc;
        this.celular = dado.celular;
      });
    });
  }

  salvar() {
    if(this.nome == '') {
      document.querySelector('#nome')?.classList.add('has-errors');
      document.querySelector('#nome')?.setAttribute('tooltip', 'true');
      return;
    }else {
      document.querySelector('#nome')?.classList.remove('has-errors');
    }

    if(this.email == '') {
      document.querySelector('#email')?.classList.add('has-errors');
      document.querySelector('#email')?.setAttribute('tooltip', 'true');
      return;
    }else {
      document.querySelector('#email')?.classList.remove('has-errors');
    }

    if(this.cpf == '') {
      document.querySelector('#cpf')?.classList.add('has-errors');
      document.querySelector('#cpf')?.setAttribute('tooltip', 'true');
      return;
    }else {
      document.querySelector('#cpf')?.classList.remove('has-errors');
    }

    if(this.celular == '') {
      document.querySelector('#celular')?.classList.add('has-errors');
      document.querySelector('#celular')?.setAttribute('tooltip', 'true');
      return;
    }else {
      document.querySelector('#celular')?.classList.remove('has-errors');
    }

    if(this.data_nasc == null) {
      document.querySelector('#data_nasc')?.classList.add('has-errors');
      document.querySelector('#data_nasc')?.setAttribute('tooltip', 'true');
      return;
    }else {
      document.querySelector('#data_nasc')?.classList.remove('has-errors');
    }

    if(this.indice === '') {
      this.clienteService.salvar({
        id : this.nextId > 0 ? this.nextId : 1,
        nome : this.nome,
        email : this.email,
        cpf : this.cpf,
        data_nasc : this.data_nasc,
        celular : this.celular
      })
    }else {
      let dados = {
        nome : this.nome,
        email : this.email,
        cpf : this.cpf,
        data_nasc : this.data_nasc,
        celular : this.celular
      };
      this.clienteService.editar(dados, this.indice);
    }
    this.router.navigate(['/cliente']);
  }

  ngOnInit(): void {
    this.setLastId();
  }


  private setLastId() {
    this.clienteService.listar()
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
