import { Component } from '@angular/core';
import {FornecedorService} from "../fornecedor.service";
import {EstadoService} from "../../estado/estado.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
  styleUrls: ['./fornecedor-form.component.scss']
})
export class FornecedorFormComponent {
  public nome:string = '';
  public razaoSocial:string = '';
  public cnpj:string = '';
  public contato:string = '';
  public email:string = '';
  public logradouro:string = '';
  public complemento:string = '';
  public bairro:string = '';
  public cidade:string = '';
  public indice:string = '';
  public nextId:number = 0;
  public estado_id:string = '';
  public estados:Array<any> = [];

  constructor(
    public fornecedorService: FornecedorService,
    public estadoService: EstadoService,
    public activated_route:ActivatedRoute,
    public router:Router
  ) {
    this.preencheSelectFornecedores();
    this.activated_route.params.subscribe((params:any) => {
      if(params.indice === undefined)
        return;

      this.fornecedorService.ref().child('/' + params.indice).on('value', (snapshot:any) => {
        let dado:any = snapshot.val();
        this.indice = params.indice;
        this.nome = dado.nome;
        this.razaoSocial = dado.razaoSocial;
        this.cnpj = dado.cnpj;
        this.contato = dado.contato;
        this.email = dado.email;
        this.logradouro = dado.logradouro;
        this.complemento = dado.complemento;
        this.bairro = dado.bairro;
        this.cidade = dado.cidade;
        this.estado_id = dado.estado_id;
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

    if(this.cnpj == '') {
      document.querySelector('#cnpj')?.classList.add('has-errors');
      document.querySelector('#cnpj')?.setAttribute('tooltip', 'true');
      return;
    }else {
      document.querySelector('#cnpj')?.classList.remove('has-errors');
    }

    if(this.email == '') {
      document.querySelector('#email')?.classList.add('has-errors');
      document.querySelector('#email')?.setAttribute('tooltip', 'true');
      return;
    }else {
      document.querySelector('#email')?.classList.remove('has-errors');
    }

    if(this.logradouro == '') {
      document.querySelector('#logradouro')?.classList.add('has-errors');
      document.querySelector('#logradouro')?.setAttribute('tooltip', 'true');
      return;
    }else {
      document.querySelector('#logradouro')?.classList.remove('has-errors');
    }

    if(this.bairro == '') {
      document.querySelector('#bairro')?.classList.add('has-errors');
      document.querySelector('#bairro')?.setAttribute('tooltip', 'true');
      return;
    }else {
      document.querySelector('#bairro')?.classList.remove('has-errors');
    }

    if(this.cidade == '') {
      document.querySelector('#cidade')?.classList.add('has-errors');
      document.querySelector('#cidade')?.setAttribute('tooltip', 'true');
      return;
    }else {
      document.querySelector('#cidade')?.classList.remove('has-errors');
    }

    if(this.estado_id == '') {
      document.querySelector('#estado-id')?.classList.add('has-errors');
      document.querySelector('#estado-id')?.setAttribute('tooltip', 'true');
      return;
    }else {
      document.querySelector('#estado-id')?.classList.remove('has-errors');
    }

    if (!this.validaCnpj()) {
      document.querySelector('#cnpj')?.classList.add('has-errors');
      alert("O CNPJ informado é inválido!");
      return;
    }

    if(this.indice === '') {
      this.fornecedorService.salvar({
        id : this.nextId > 0 ? this.nextId : 1,
        nome : this.nome,
        razaoSocial: this.razaoSocial,
        cnpj: this.cnpj,
        contato: this.contato,
        email: this.email,
        logradouro: this.logradouro,
        complemento: this.complemento,
        bairro: this.bairro,
        cidade: this.cidade,
        estado_id: this.estado_id
      })
    }else {
      let dados = {
        nome : this.nome,
        razaoSocial: this.razaoSocial,
        cnpj: this.cnpj,
        contato: this.contato,
        email: this.email,
        logradouro: this.logradouro,
        complemento: this.complemento,
        bairro: this.bairro,
        cidade: this.cidade,
        estado_id : this.estado_id
      };
      this.fornecedorService.editar(dados, this.indice);
    }
    this.router.navigate(['/fornecedor']);
  }

  ngOnInit(): void {
    this.setLastId();
  }

  private preencheSelectFornecedores() {
    this.estadoService.listar()
      .on('value', (snapshot:any) => {
        let response = snapshot.val();

        if (response == null) return;
        Object.values( response )
          .forEach(
            (e:any, i:number) => {
              let _indice = Object.keys(snapshot.val())[i];

              this.estados.push({
                nome: e.nome,
                indice: _indice
              });
            }
          );
      });
  }

  private setLastId() {
    this.fornecedorService.listar()
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
  setCnpjMask() {
    return '00.000.000/0000-00'
  }

  setContatoMask() {
    return '(00) 0000-0000||(00) 00000-0000';
  }

  validaCnpj() {

    if (this.cnpj === undefined) {
      return false;
    }

    var strCNPJ = this.cnpj.
      replace('.', '').
      replace('.', '').
      replace('/', '').
      replace('-', '');

    if (
      strCNPJ === '00000000000000' ||
      strCNPJ === '11111111111111' ||
      strCNPJ === '22222222222222' ||
      strCNPJ === '33333333333333' ||
      strCNPJ === '44444444444444' ||
      strCNPJ === '55555555555555' ||
      strCNPJ === '66666666666666' ||
      strCNPJ === '77777777777777' ||
      strCNPJ === '88888888888888' ||
      strCNPJ === '99999999999999' ||
      strCNPJ.length !== 14
    ) {
      return false;
    }

    var tamanho = strCNPJ.length - 2;
    var numeros = strCNPJ.substring(0, tamanho);
    var digitos = strCNPJ.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      // @ts-ignore
        soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    // @ts-ignore
      if (resultado != digitos.charAt(0)) {
      return false;
    }

    tamanho = tamanho + 1;
    numeros = strCNPJ.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let k = tamanho; k >= 1; k--) {
      // @ts-ignore
        soma += numeros.charAt(tamanho - k) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    // @ts-ignore
      if (resultado != digitos.charAt(1)) {
      return false;
    }

    return true;
  }
}
