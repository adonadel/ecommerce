import { Component } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.scss']
})
export class CategoriaFormComponent {
  public nome:string = '';
  public indice:string = '';
  public nextId:number = 0;

  constructor(
    public categoria_service:CategoriaService,
    public activated_route:ActivatedRoute,
    public router:Router
  ) {
    this.activated_route.params.subscribe((params:any) => {
      if(params.indice === undefined)
        return;

      this.categoria_service.ref().child('/' + params.indice).on('value', (snapshot:any) => {
        let dado:any = snapshot.val();
        this.indice = params.indice;
        this.nome = dado.nome;
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
      this.categoria_service.salvar({
        id : this.nextId > 0 ? this.nextId : 1,
        nome : this.nome
      })
    }else {
      let dados = {
        nome:this.nome
      };
      this.categoria_service.editar(dados, this.indice);
    }
    this.router.navigate(['/categoria']);
  }

  ngOnInit(): void {
    this.setLastId();
  }

  private setLastId() {
    this.categoria_service.listar()
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
