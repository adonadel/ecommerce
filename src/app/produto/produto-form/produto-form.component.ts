import {Component, OnInit} from '@angular/core';
import {ProdutoService} from "../produto.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SubCategoriaService} from "../../sub-categoria/sub-categoria.service";
import {CategoriaService} from "../../categoria/categoria.service";

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent {
  public nome:string = '';
  public indice:string = '';
  public nextId:number = 0;
  public preco:number = 0;
  public descricao:string = '';
  public categoria_id:string = '';
  public subcategoria_id:string = '';

  constructor(
    public produtoService:ProdutoService,
    public activated_route:ActivatedRoute,
    public subCategoriaService:SubCategoriaService,
    public categoriaService: CategoriaService,
    public router:Router
  ) {
    this.activated_route.params.subscribe((params:any) => {
      if(params.indice === undefined)
        return;

      this.produtoService.ref().child('/' + params.indice).on('value', (snapshot:any) => {
        let dado:any = snapshot.val();
        this.indice = params.indice;
        this.nome = dado.nome;
        this.preco = dado.preco;
        this.descricao = dado.descricao;
      });
    });
  }
  salvar() {
    if(this.nome == '') {
      document.querySelector('#nome')?.classList.add('has-errors');
      document.querySelector('#nome')?.setAttribute('tooltip', 'true');
      return;
    }

    if(this.indice === '') {
      this.produtoService.salvar({
        id : this.nextId > 0 ? this.nextId : 1,
        nome : this.nome
      })
    }else {
      let dados = {
        nome:this.nome
      };
      this.produtoService.editar(dados, this.indice);
    }
    this.router.navigate(['/produto']);
  }

  ngOnInit(): void {
    this.produtoService.listar()
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

    this.setLastId();
    this.preencheSelectCategorias();
  }

  private preencheSelectCategorias() {
    this.categoriaService.listar()
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
    this.produtoService.listar()
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
