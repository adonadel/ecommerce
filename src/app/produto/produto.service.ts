import { Injectable } from '@angular/core';
import {FirebaseService} from "../firebase.service";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    public firebase_service:FirebaseService
  ) { }

  ref() {
    return this.firebase_service.ref().child('/produto');
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

  async getByIndice(indice:string){
    let produto:any;
    await this.ref().orderByKey()
    .equalTo(indice)
    .once('value')
    .then( function(snapshot) {
      if (snapshot.exists()) {
          produto = Object.values(snapshot.val())[0];
      }
    });
    return produto;
  }
}
