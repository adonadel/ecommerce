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
  public indice:string = '';
  public nextId:number = 0;

  constructor(
    public usuario_service:UsuarioService,
    public activated_route:ActivatedRoute,
    public router:Router
  ) {
    this.activated_route.params.subscribe((params:any) => {
      if(params.indice === undefined)
        return;

      this.usuario_service.ref().child('/' + params.indice).on('value', (snapshot:any) => {
        let dado:any = snapshot.val();
        this.indice = params.indice;
        this.nome = dado.nome;
        this.email = dado.email;
        this.password = dado.password;
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
      this.usuario_service.salvar({
        id : this.nextId > 0 ? this.nextId : 1,
        nome : this.nome,
        email : this.email,
        password : this.password
      })
    }else {
      let dados = {
        nome:this.nome,
        email : this.email,
        password : this.password
      };
      this.usuario_service.editar(dados, this.indice);
    }
    this.router.navigate(['/usuario']);
  }

  ngOnInit(): void {
    this.setLastId();
  }


  private setLastId() {
    this.usuario_service.listar()
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
