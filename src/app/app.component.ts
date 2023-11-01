import { Component } from '@angular/core';
import { AutenticacaoService } from './autenticacao/autenticacao.service';
import { GuardService } from './service/guard.service';
import { Router, UrlTree } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce';

  public is_logged:boolean = false;
  constructor(
    public autenticacaoService:AutenticacaoService,
    public router:Router,
    public guardService:GuardService
  ){
    guardService.isLogged();

    this.guardService.is_logged
    .subscribe(
      (islogged:any) => {
        this.is_logged = !!islogged;
      }
    );
  }
}
