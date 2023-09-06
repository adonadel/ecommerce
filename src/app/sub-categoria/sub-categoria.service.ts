import { Injectable } from '@angular/core';
import {FirebaseService} from "../firebase.service";

@Injectable({
  providedIn: 'root'
})
export class SubCategoriaService {

  constructor(
    public firebase_service:FirebaseService
  ) { }

  ref() {
    return this.firebase_service.ref().child('/sub-categoria');
  }

  salvar(dados : any) {
    this.ref().push(dados).then();
  }

  listar() {
    return this.ref();
  }

  excluir(indice:string){
    this.ref().child('/' + indice).remove().then();
  }

  editar(dados:any, indice:string) {
    this.ref().child('/' + indice).update(dados).then();
  }
}
