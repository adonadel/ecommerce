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
  public categorias:Array<any> = [];
  public subcategorias:Array<any> = [];
  public is_disabled:boolean = true;

  constructor(
    public produtoService:ProdutoService,
    public activated_route:ActivatedRoute,
    public subCategoriaService:SubCategoriaService,
    public categoriaService: CategoriaService,
    public router:Router
  ) {
    this.preencheSelectCategorias();
    this.activated_route.params.subscribe((params:any) => {
      if(params.indice === undefined)
        return;

      this.produtoService.ref().child('/' + params.indice).on('value', (snapshot:any) => {
        let dado:any = snapshot.val();
        this.indice = params.indice;
        this.nome = dado.nome;
        this.preco = dado.preco;
        this.categoria_id = dado.categoria_id;
        this.subcategoria_id = dado.subcategoria_id;
        this.listarSubcategoria(dado.categoria_id);
        this.descricao = dado.descricao;
      });
    });
  }
  salvar() {
    if(this.nome == '') {
      document.querySelector('#nome')?.classList.add('has-errors');
      document.querySelector('#nome')?.setAttribute('tooltip', 'true');
      return;
    }else {
      document.querySelector('#nome')?.classList.remove('has-errors');
    }

    if(this.preco == 0) {
      document.querySelector('#preco')?.classList.add('has-errors');
      document.querySelector('#preco')?.setAttribute('tooltip', 'true');
      return;
    }else {
      document.querySelector('#preco')?.classList.remove('has-errors');
    }

    if(this.descricao == '') {
      document.querySelector('#descricao')?.classList.add('has-errors');
      document.querySelector('#descricao')?.setAttribute('tooltip', 'true');
      return;
    }else {
      document.querySelector('#descricao')?.classList.remove('has-errors');
    }

    if(this.categoria_id == '') {
      document.querySelector('#categoria-id')?.classList.add('has-errors');
      document.querySelector('#categoria-id')?.setAttribute('tooltip', 'true');
      return;
    }else {
      document.querySelector('#categoria-id')?.classList.remove('has-errors');
    }

    if(this.categoria_id == '') {
      document.querySelector('#subcategoria-id')?.classList.add('has-errors');
      document.querySelector('#subcategoria-id')?.setAttribute('tooltip', 'true');
      return;
    }else {
      document.querySelector('#subcategoria-id')?.classList.remove('has-errors');
    }

    if(this.indice === '') {
      this.produtoService.salvar({
        id : this.nextId > 0 ? this.nextId : 1,
        nome : this.nome,
        descricao : this.descricao,
        categoria_id : this.categoria_id,
        subcategoria_id : this.subcategoria_id,
        preco : this.preco
      })
    }else {
      let dados = {
        nome:this.nome,
        descricao : this.descricao,
        categoria_id : this.categoria_id,
        subcategoria_id : this.subcategoria_id,
        preco : this.preco
      };
      this.produtoService.editar(dados, this.indice);
    }
    this.router.navigate(['/produto']);
  }

  ngOnInit(): void {
    this.setLastId();
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
              let _indice = Object.keys(snapshot.val())[i];

              this.categorias.push({
                nome: e.nome,
                indice: _indice
              });
            }
          );
      });
  }

  listarSubcategoria(_categoria:string){

    this.subcategorias.splice(0,this.subcategorias.length);

    this.subCategoriaService.listar()
    .on('value',(snapshot:any) => {

      let response = snapshot.val();

      if (response == null) return;

      Object.values( response )
      .forEach(
        (e:any,i:number) => {

          let _indice = Object.keys(snapshot.val())[i];

          if (_categoria == e.categoria_id){

            this.subcategorias.push({
              nome: e.nome,
              preco:e.preco,
              descricao: e.descricao,
              categoria_id: e.categoria_id,
              subcategoria: e.subcategoria,
              indice: _indice
            });
          }
        }
      );

      if (this.subcategorias.length > 0){
        this.is_disabled = false;
      }else{
        this.is_disabled = true;
      }
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
