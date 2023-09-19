import {Component, OnInit} from '@angular/core';
import {EstadoService} from "../estado.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-estado-listar',
  templateUrl: './estado-listar.component.html',
  styleUrls: ['./estado-listar.component.scss']
})
export class EstadoListarComponent implements OnInit{
  public dados:Array<any> = [];

  constructor(
    public estadoService:EstadoService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.estadoService.listar()
    .on('value',(snapshot:any) => {

      this.dados.splice(0,this.dados.length);

      let response = snapshot.val();

      if (response == null) return;

      Object.values( response )
      .forEach(
        (e:any,i:number) => {
          this.dados.push({
            id: e.id,
            nome: e.nome,
            uf: e.uf,
            indice: Object.keys(snapshot.val())[i]
          });
        }
      );
    });
  }

  excluir(key:string, nome:string) {
    if(confirm("Deseja realmente excluir o estado \"" + nome + "\"?")) {
      this.estadoService.excluir(key);
    }
  }

  editar(key:string) {
    this.router.navigate(['/estado/editar/' + key]);
  }
}
