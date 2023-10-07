import { Injectable } from '@angular/core';
import {RequisicaoService} from "../requisicao.service";


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private requisicaoService:RequisicaoService
  ) { }

  salvar(fd:any) {
    return this.requisicaoService.post(fd, 'usuario');
  }

  listar() {
    return this.requisicaoService.get('usuario');
  }

  excluir(indice:string){
    return this.requisicaoService.delete(indice, 'usuario');
  }

  editar(fd: any, indice:string) {
    return this.requisicaoService.put(fd, 'usuario');
  }
}
