import { Routes } from '@angular/router';
import { Login } from './users/login/login';
import { UserList } from './users/user-list/user-list';
import { Register } from './users/register/register';
import { ProductList } from './products/product-list/product-list';
import { ProductAdd } from './products/product-add/product-add';
import { OrdersComponent } from './orders/orders';
import { ProductDetail } from './products/product-detail/product-detail';

export const routes: Routes = [
  { path: ``, component: Login },
  { path: `users`, component: UserList },
  { path: `register`, component: Register },
  { path: `products`, component: ProductList },
  { path: `products/add`, component: ProductAdd },
  { path: `orders`, component: OrdersComponent },
  { path: 'products/:id', component: ProductDetail },
];
