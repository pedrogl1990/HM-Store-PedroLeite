import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { ProdutoDetalheComponent } from './produto-detalhe/produto-detalhe.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AdministrationComponent } from './administration/administration.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'produtos/:categoria', component: ProdutosComponent },
  { path: 'produto-detalhe/:id', component: ProdutoDetalheComponent },
  {
    path: 'wishlist',
    component: WishlistComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'admin', component: AdministrationComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuardService] },
  { path: 'perfil', component: ProfileComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
