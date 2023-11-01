import { Injectable } from '@angular/core';
import { RequisicaoService } from '../requisicao.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  public is_logged:boolean = false;
  constructor(
    public requisicaoService:RequisicaoService
  ) {}

  logar(usuario:string,senha:string){
    return this.requisicaoService.post({
      email:usuario,
      senha:senha
    },'/auth');
  }

  logon(){
    this.is_logged = true;
    location.href = '/home';
  }

  verifyToken(){
    return this.requisicaoService
    .get('/auth/verifytoken/' + sessionStorage.getItem('token'));
  }
}
