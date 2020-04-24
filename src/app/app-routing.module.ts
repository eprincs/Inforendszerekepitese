import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartAddComponent } from './part-add/part-add.component';
import { PartListComponent } from './part-list/part-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductListComponent } from './product-list/product-list.component';
import { OrderComponent } from './order/order.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'part-list'},
  {path: 'part-add', component: PartAddComponent},
  {path: 'part-list', component: PartListComponent},
  {path: 'product-create', component: ProductCreateComponent},
  {path: 'product-list', component: ProductListComponent},
  {path: 'order', component: OrderComponent},
  {path: 'customer-add', component: CustomerAddComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
