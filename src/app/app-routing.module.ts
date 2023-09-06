import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component';
import { HomeComponent } from './home/home.component';
import { CategoriaListarComponent } from './categoria/categoria-listar/categoria-listar.component';
import { CategoriaFormComponent } from './categoria/categoria-form/categoria-form.component';
import { FormaPagamentoListarComponent } from './forma-pagamento/forma-pagamento-listar/forma-pagamento-listar/forma-pagamento-listar.component';
import { FormaPagamentoFormComponent } from './forma-pagamento/forma-pagamento-form/forma-pagamento-form/forma-pagamento-form.component';
import { FormaPagamentoComponent } from './forma-pagamento/forma-pagamento.component';
import {SubCategoriaComponent} from "./sub-categoria/sub-categoria.component";
import {SubCategoriaListarComponent} from "./sub-categoria/sub-categoria-listar/sub-categoria-listar.component";
import {SubCategoriaFormComponent} from "./sub-categoria/sub-categoria-form/sub-categoria-form.component";
import {UsuarioComponent} from "./usuario/usuario.component";
import {UsuarioListarComponent} from "./usuario/usuario-listar/usuario-listar.component";
import {UsuarioFormComponent} from "./usuario/usuario-form/usuario-form.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'

  },
  {
    path: 'home',
    component: HomeComponent

  },
  {
    path: 'categoria',
    component: CategoriaComponent,
    children: [
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full'
      },
      {
        path: 'listar',
        component: CategoriaListarComponent
      },
      {
        path: 'adicionar',
        component: CategoriaFormComponent
      },
      {
        path: 'editar/:indice',
        component: CategoriaFormComponent,
      }
    ]
  },
  {
    path: 'forma-pagamento',
    component: FormaPagamentoComponent,
    children: [
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full'
      },
      {
        path: 'listar',
        component: FormaPagamentoListarComponent
      },
      {
        path: 'adicionar',
        component: FormaPagamentoFormComponent
      },
      {
        path: 'editar/:indice',
        component: FormaPagamentoFormComponent,
      }
    ]
  },
  {
    path: 'sub-categoria',
    component: SubCategoriaComponent,
    children: [
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full'
      },
      {
        path: 'listar',
        component: SubCategoriaListarComponent
      },
      {
        path: 'adicionar',
        component: SubCategoriaFormComponent
      },
      {
        path: 'editar/:indice',
        component: SubCategoriaFormComponent,
      }
    ]
  },
  {
    path: 'usuario',
    component: UsuarioComponent,
    children: [
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full'
      },
      {
        path: 'listar',
        component: UsuarioListarComponent
      },
      {
        path: 'adicionar',
        component: UsuarioFormComponent
      },
      {
        path: 'editar/:indice',
        component: UsuarioFormComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
