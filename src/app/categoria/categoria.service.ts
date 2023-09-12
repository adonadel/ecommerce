import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    public firebase_service:FirebaseService
  ) { }

  ref() {
    return this.firebase_service.ref().child('/categoria');
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

  async getByIndice(indice:string) {
    let categoria:any;
    await this.ref().orderByKey()
      .equalTo(indice)
      .once('value')
      .then( function(snapshot) {
        if (snapshot.exists()) {
          let response = Object.values(snapshot.val())[0];

          if (response == null) return;

          categoria = response;
        }
      });

    return categoria;
  }
}
