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
    return this.requisicaoService.get('/usuario/listar');
  }

  excluir(id:number){
    return this.requisicaoService.delete('/usuario/' + id);
  }

  editar(fd: any, id:number) {
    return this.requisicaoService.put(fd, '/usuario/' + id);
  }

  getById(id:number) {
    return this.requisicaoService.getById('/usuario/' + id);
  }
}
