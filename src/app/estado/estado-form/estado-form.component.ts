import { Component } from '@angular/core';
import {EstadoService} from "../estado.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-estado-form',
  templateUrl: './estado-form.component.html',
  styleUrls: ['./estado-form.component.scss']
})
export class EstadoFormComponent {
  public nome:string = '';
  public uf:string = '';
  public indice:string = '';
  public nextId:number = 0;

  constructor(
    public estadoService:EstadoService,
    public activated_route:ActivatedRoute,
    public router:Router
  ) {
    this.activated_route.params.subscribe((params:any) => {
      if(params.indice === undefined)
        return;

      this.estadoService.ref().child('/' + params.indice).on('value', (snapshot:any) => {
        let dado:any = snapshot.val();
        this.indice = params.indice;
        this.nome = dado.nome;
        this.uf = dado.uf;
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

    if(this.uf == '') {
      document.querySelector('#uf')?.classList.add('has-errors');
      document.querySelector('#uf')?.setAttribute('tooltip', 'true');
      return;
    }else {
      document.querySelector('#uf')?.classList.remove('has-errors');
    }

    if(this.indice === '') {
      this.estadoService.salvar({
        id : this.nextId > 0 ? this.nextId : 1,
        nome : this.nome,
        uf : this.uf
      })
    }else {
      let dados = {
        nome:this.nome,
        uf:this.uf
      };
      this.estadoService.editar(dados, this.indice);
    }
    this.router.navigate(['/estado']);
  }

  ngOnInit(): void {
    this.setLastId();
  }

  private setLastId() {
    this.estadoService.listar()
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
