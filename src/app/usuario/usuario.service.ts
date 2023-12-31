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
    return this.requisicaoService.post(fd, '/usuarios');
  }

  listar() {
    return this.requisicaoService.get('/usuarios/listar');
  }

  excluir(_id:number){
    return this.requisicaoService.delete('/usuarios/' + _id);
  }

  editar(fd: any, id:number) {
    return this.requisicaoService.put(fd, '/usuarios/' + id);
  }

  getById(id:number) {
    return this.requisicaoService.getById('/usuarios/' + id);
  }

  pesquisar(termo: string) {
    return this.requisicaoService.get('/usuarios/pesquisar/' + termo)
  }
}
