import { Component, OnInit} from '@angular/core';
import {UsuarioService} from "../usuario.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-usuario-listar',
  templateUrl: './usuario-listar.component.html',
  styleUrls: ['./usuario-listar.component.scss']
})
export class UsuarioListarComponent implements OnInit{
  public dados:Array<any> = [];

  constructor(
    public usuario_service:UsuarioService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.usuario_service.listar()
      .subscribe(
        (dados:any) => {
          this.dados = dados;
        }
      )
  }

  excluir(id:number, nome:string) {
    if(confirm("Deseja realmente excluir o usuário \"" + nome + "\"?")) {
      this.usuario_service.excluir(id).subscribe(() => {
        this.listar();
      });
    }
  }

  editar(key:string) {
    this.router.navigate(['/usuario/editar/' + key]);
  }
}
