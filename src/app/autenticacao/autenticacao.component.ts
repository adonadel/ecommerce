import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from './autenticacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autenticacao',
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.scss']
})
export class AutenticacaoComponent implements OnInit {
  public email:string = '';
  public password:string = '';

  constructor(
    public autenticacaoService:AutenticacaoService,
    public router:Router
  ){}

  ngOnInit(): void {
  }
  entrar(){
    this.autenticacaoService.logar(this.email,this.password)
    .subscribe({
      next: (_res:any) => {
        sessionStorage.setItem('token',_res.token);
        this.autenticacaoService.logon();
      },
      error: () => {
        console.log('Erro ...');
      }
    })
  }
}
