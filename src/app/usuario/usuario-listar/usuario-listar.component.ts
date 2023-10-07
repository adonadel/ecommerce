import { Component } from '@angular/core';
import {UsuarioService} from "../usuario.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-usuario-listar',
  templateUrl: './usuario-listar.component.html',
  styleUrls: ['./usuario-listar.component.scss']
})
export class UsuarioListarComponent {
  public dados:Array<any> = [];

  constructor(
    public usuario_service:UsuarioService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.usuario_service.listar()
    // .on('value',(snapshot:any) => {
    //
    //   this.dados.splice(0,this.dados.length);
    //
    //   let response = snapshot.val();
    //
    //   if (response == null) return;
    //
    //   Object.values( response )
    //   .forEach(
    //     (e:any,i:number) => {
    //       this.dados.push({
    //         id: e.id,
    //         nome: e.nome,
    //         email: e.email,
    //         password: e.password,
    //         indice: Object.keys(snapshot.val())[i]
    //       });
    //     }
    //   );
    // });
  }

  excluir(key:string, nome:string) {
    if(confirm("Deseja realmente excluir o usuário \"" + nome + "\"?")) {
      this.usuario_service.excluir(key);
    }
  }

  editar(key:string) {
    this.router.navigate(['/usuario/editar/' + key]);
  }
}
