import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CarouselComponent } from './carousel/carousel.component';
import { HttpClientModule } from '@angular/common/http';
import { ProdutosComponent } from './produtos/produtos.component';
import { ProdutoDetalheComponent } from './produto-detalhe/produto-detalhe.component';
import { FilterBoxComponent } from './filter-box/filter-box.component';
import { ProdutoComponent } from './produto/produto.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { AdministrationComponent } from './administration/administration.component';
import { ProductsManagementComponent } from './products-management/products-management.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    HomepageComponent,
    CarouselComponent,
    ProdutosComponent,
    ProdutoDetalheComponent,
    FilterBoxComponent,
    ProdutoComponent,
    WishlistComponent,
    ListaProdutosComponent,
    AdministrationComponent,
    ProductsManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
