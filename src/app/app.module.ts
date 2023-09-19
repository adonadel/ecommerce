import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaListarComponent } from './categoria/categoria-listar/categoria-listar.component';
import { CategoriaFormComponent } from './categoria/categoria-form/categoria-form.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormsModule } from '@angular/forms';
import { FormaPagamentoComponent } from './forma-pagamento/forma-pagamento.component';
import { FormaPagamentoListarComponent } from './forma-pagamento/forma-pagamento-listar/forma-pagamento-listar/forma-pagamento-listar.component';
import { FormaPagamentoFormComponent } from './forma-pagamento/forma-pagamento-form/forma-pagamento-form/forma-pagamento-form.component';
import { SubCategoriaComponent } from './sub-categoria/sub-categoria.component';
import { SubCategoriaListarComponent } from './sub-categoria/sub-categoria-listar/sub-categoria-listar.component';
import { SubCategoriaFormComponent } from './sub-categoria/sub-categoria-form/sub-categoria-form.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { UsuarioListarComponent } from './usuario/usuario-listar/usuario-listar.component';
import { ProdutoListarComponent } from './produto/produto-listar/produto-listar.component';
import { ProdutoFormComponent } from './produto/produto-form/produto-form.component';
import { ProdutoComponent } from './produto/produto.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { ClienteListarComponent } from './cliente/cliente-listar/cliente-listar.component';
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import { EstadoComponent } from './estado/estado.component';
import { EstadoListarComponent } from './estado/estado-listar/estado-listar.component';
import { EstadoFormComponent } from './estado/estado-form/estado-form.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { FornecedorListarComponent } from './fornecedor/fornecedor-listar/fornecedor-listar.component';
import { FornecedorFormComponent } from './fornecedor/fornecedor-form/fornecedor-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    CategoriaComponent,
    CategoriaListarComponent,
    CategoriaFormComponent,
    FormaPagamentoComponent,
    FormaPagamentoListarComponent,
    FormaPagamentoFormComponent,
    SubCategoriaComponent,
    SubCategoriaListarComponent,
    SubCategoriaFormComponent,
    UsuarioComponent,
    UsuarioFormComponent,
    UsuarioListarComponent,
    ProdutoListarComponent,
    ProdutoFormComponent,
    ProdutoComponent,
    ClienteComponent,
    ClienteFormComponent,
    ClienteListarComponent,
    EstadoComponent,
    EstadoListarComponent,
    EstadoFormComponent,
    FornecedorComponent,
    FornecedorListarComponent,
    FornecedorFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDJuJIZOntQP0DHzopv3kT843csdyr3IP8",
      authDomain: "ecommerce-1c0a6.firebaseapp.com",
      projectId: "ecommerce-1c0a6",
      storageBucket: "ecommerce-1c0a6.appspot.com",
      messagingSenderId: "382890108062",
      appId: "1:382890108062:web:37d19810b1eeeb9fd6078f",
      measurementId: "G-H9SE6Y623M"
    }),
    AngularFireStorageModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
