import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { ProdutoDetalheComponent } from './produto-detalhe/produto-detalhe.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AdministrationComponent } from './administration/administration.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'produtos/:categoria', component: ProdutosComponent },
  { path: 'produto-detalhe/:id', component: ProdutoDetalheComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'admin', component: AdministrationComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
