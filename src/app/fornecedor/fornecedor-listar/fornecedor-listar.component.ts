import {Component, OnInit} from '@angular/core';
import {FornecedorService} from "../fornecedor.service";
import {EstadoService} from "../../estado/estado.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-fornecedor-listar',
  templateUrl: './fornecedor-listar.component.html',
  styleUrls: ['./fornecedor-listar.component.scss']
})
export class FornecedorListarComponent  implements OnInit{
  public dados:Array<any> = [];

  constructor(
    public fornecedorService: FornecedorService,
    public estadoService: EstadoService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.fornecedorService.listar()
    .on('value',(snapshot:any) => {

      this.dados.splice(0,this.dados.length);

      let response = snapshot.val();

      if (response == null) return;

      Object.values( response )
      .forEach(
        async (e:any,i:number) => {
          let estado:any = await this.estadoService.getByIndice(e.estado_id);

          this.dados.push({
            id: e.id,
            nome: e.nome,
            razaoSocial: e.razaoSocial,
            estado: estado.nome,
            indice: Object.keys(snapshot.val())[i]
          });
        }
      );
    });
  }

  excluir(key:string, nome:string) {
    if(confirm("Deseja realmente excluir o fornecedor \"" + nome + "\"?")) {
      this.fornecedorService.excluir(key);
    }
  }

  editar(key:string) {
    this.router.navigate(['/fornecedor/editar/' + key]);
  }
}
