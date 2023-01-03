import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './card/card.component';
import { AllProductsComponent } from './products/all-products/all-products.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
const routes: Routes = [
  {path:'',redirectTo:'products' ,pathMatch:'full'},
  {path:'cards',component:CardComponent},
  {path:'products',component:AllProductsComponent},
  {path:'details/:id',component:ProductDetailsComponent},
  {path:'**',redirectTo:'products' ,pathMatch:'full'},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],


exports: [RouterModule]
})
export class AppRoutingModule { }
