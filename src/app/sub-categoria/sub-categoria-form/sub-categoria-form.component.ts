import { Component } from '@angular/core';
import {SubCategoriaService} from "../sub-categoria.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoriaService} from "../../categoria/categoria.service";

@Component({
  selector: 'app-sub-categoria-form',
  templateUrl: './sub-categoria-form.component.html',
  styleUrls: ['./sub-categoria-form.component.scss']
})
export class SubCategoriaFormComponent {
  public nome:string = '';
  public indice:string = '';
  public nextId:number = 0;
  public categoria_id:string = '';

  constructor(
    public subCategoria_service:SubCategoriaService,
    public categoria_service: CategoriaService,
    public activated_route:ActivatedRoute,
    public router:Router
  ) {
    this.activated_route.params.subscribe((params:any) => {
      if(params.indice === undefined)
        return;

      this.subCategoria_service.ref().child('/' + params.indice).on('value', (snapshot:any) => {
        let dado:any = snapshot.val();
        this.indice = params.indice;
        this.nome = dado.nome;
        this.categoria_id = dado.categoria_id;
      });
    });
  }

  salvar() {
    if(this.categoria_id == '') {
      document.querySelector('#categoria-id')?.classList.add('has-errors');
      document.querySelector('#categoria-id')?.setAttribute('tooltip', 'true');
      return;
    }else {
      document.querySelector('#categoria-id')?.classList.remove('has-errors');
    }

    if(this.nome == '') {
      document.querySelector('#nome')?.classList.add('has-errors');
      document.querySelector('#nome')?.setAttribute('tooltip', 'true');
      return;
    }else {
      document.querySelector('#nome')?.classList.remove('has-errors');
    }

    if(this.indice === '') {
      this.subCategoria_service.salvar({
        id : this.nextId > 0 ? this.nextId : 1,
        nome : this.nome,
        categoria_id : this.categoria_id
      })
    }else {
      let dados = {
        nome:this.nome,
        categoria_id : this.categoria_id
      };
      this.subCategoria_service.editar(dados, this.indice);
    }
    this.router.navigate(['/sub-categoria']);
  }

  ngOnInit(): void {
    this.setLastId();

    this.preencheSelectCategorias();
  }

  private preencheSelectCategorias() {
    this.categoria_service.listar()
      .on('value', (snapshot:any) => {
        let response = snapshot.val();
        let selectCategoria = document.querySelector("#categoria-id");

        if (response == null) return;
        Object.values( response )
          .forEach(
            (e:any, i:number) => {
              let option = document.createElement('option');
              option.value = Object.keys(snapshot.val())[i];
              option.innerHTML = e.nome;
              selectCategoria?.append(option);
            }
          );
      });
  }

  private setLastId() {
    this.subCategoria_service.listar()
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
