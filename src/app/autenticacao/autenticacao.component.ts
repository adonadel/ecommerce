import { Component } from '@angular/core';
import { AutenticacaoService } from './autenticacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autenticacao',
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.scss']
})
export class AutenticacaoComponent {
  public email:string = '';
  public password:string = '';

  constructor(
    public autenticacao_service:AutenticacaoService,
    public router:Router
  ){}

  entrar(){
    this.autenticacao_service.logar(this.email,this.password)
    .subscribe({
      next: (_res:any) => {
        sessionStorage.setItem('token',_res.token);
        this.autenticacao_service.logon();
        this.router.navigateByUrl('/home');
      },
      error: () => {
        console.log('Erro ...');
      }
    })
  }
}
