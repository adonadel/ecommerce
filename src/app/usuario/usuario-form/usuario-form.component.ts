import { Component } from '@angular/core';
import {UsuarioService} from "../usuario.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent {
  public nome:string = '';
  public email:string = '';
  public password:string = '';
  public id:number = 0;

  constructor(
    private usuario_service:UsuarioService,
    private activated_route:ActivatedRoute,
    public router:Router
  ) {
    this.activated_route.params.subscribe((params:any) => {
      if(params.id === undefined)
        return;

      this.usuario_service.getById(params.id).subscribe(
        (dados:any) => {
          this.id = dados.id;
          this.nome = dados.nome;
          this.email = dados.email;
          this.password = dados.password;
          this.nome = dados.nome;
        }
      )
    });
  }

  salvar() {
    if(this.nome == '') {
      document.querySelector('#nome')?.classList.add('has-errors');
      document.querySelector('#nome')?.setAttribute('tooltip', 'true');
      return;
    }
    if(this.email == '') {
      document.querySelector('#email')?.classList.add('has-errors');
      document.querySelector('#email')?.setAttribute('tooltip', 'true');
      return;
    }
    if(this.password == '') {
      document.querySelector('#password')?.classList.add('has-errors');
      document.querySelector('#password')?.setAttribute('tooltip', 'true');
      return;
    }
    let dados = {
      nome:this.nome,
      email : this.email,
      password : this.password
    };
    let response = null;

    if(this.id === 0) {
      response = this.usuario_service.salvar(dados).subscribe()
      console.log(response);
    }else {
      response = this.usuario_service.editar(dados, this.id).subscribe();
    }
    // this.router.navigate(['/usuario']);
  }
}
