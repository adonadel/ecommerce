import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component';
import { HomeComponent } from './home/home.component';
import { CategoriaListarComponent } from './categoria/categoria-listar/categoria-listar.component';
import { CategoriaFormComponent } from './categoria/categoria-form/categoria-form.component';
import { FormaPagamentoListarComponent } from './forma-pagamento/forma-pagamento-listar/forma-pagamento-listar/forma-pagamento-listar.component';
import { FormaPagamentoFormComponent } from './forma-pagamento/forma-pagamento-form/forma-pagamento-form/forma-pagamento-form.component';
import { FormaPagamentoComponent } from './forma-pagamento/forma-pagamento.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
