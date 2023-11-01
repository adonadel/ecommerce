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
  public termo:string = '';

  constructor(
    public usuarioService:UsuarioService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.usuarioService.listar()
      .subscribe(
        (dados:any) => {
          this.dados = dados;
        }
      )
  }

  excluir(_id:number, nome:string) {
    if(confirm("Deseja realmente excluir o usuário \"" + nome + "\"?")) {
      this.usuarioService.excluir(_id).subscribe((teste) => {
        console.log(teste);
        this.listar();
      });
    }
  }

  editar(key:string) {
    this.router.navigate(['/usuario/editar/' + key]);
  }

  pesquisar() {
    let termo = this.termo;

    if(termo == '') {
      this.listar();
      return;
    }

    this.usuarioService.pesquisar(termo)
      .subscribe(
        (dados:any) => {
          this.dados = dados;
        }
      );
  }
}
