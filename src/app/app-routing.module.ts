import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [

  {
    path: "", canActivate: [authGuard], loadComponent: () => import('./layouts/blank-layout/blank-layout.component').then(m => m.BlankLayoutComponent), children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", loadComponent: () => import('./components/home/home.component').then((m) => m.HomeComponent), title: "Home" },
      { path: "cart", loadComponent: () => import('./components/cart/cart.component').then((m) => m.CartComponent), title: "Cart" },
      { path: "products", loadComponent: () => import('./components/products/products.component').then((m) => m.ProductsComponent), title: "Products" },
      { path: "brands", loadComponent: () => import('./components/brands/brands.component').then((m) => m.BrandsComponent), title: "Brands" },
      { path: "categories", loadComponent: () => import('./components/categories/categories.component').then((m) => m.CategoriesComponent), title: "Categories" },
      { path: "catedetails/:id", loadComponent: () => import('./components/catedetails/catedetails.component').then((m) => m.CatedetailsComponent), title: "Categories" },
      { path: "details/:id", loadComponent: () => import('./components//details/details.component').then((m) => m.DetailsComponent), title: "Product Details" },
      { path: "payment/:id", loadComponent: () => import('./components/payment/payment.component').then((m) => m.PaymentComponent), title: "Check Out" },
     { path: "forgetpassword", loadComponent: () => import('./components/forgetpassword/forgetpassword.component').then((m) => m.ForgetpasswordComponent), title: "Rest Password" },
    ]
  },
  {
    path: "", loadComponent: () => import('./layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent), children: [
      { path: "", redirectTo: "login", pathMatch: "full" },
      { path: "login", loadComponent: () => import('./components/login/login.component').then((m) => m.LoginComponent), title: "Login" },
      { path: "register", loadComponent: () => import('./components/register/register.component').then((m) => m.RegisterComponent), title: "Register" },
      { path: "forget", loadComponent: () => import('./components/forgetpassword/forgetpassword.component').then((m) => m.ForgetpasswordComponent), title: "Rest Password" },


    ]
  },
  {path: "**", loadComponent: () => import('./components/notfound/notfound.component').then((m) => m.NotfoundComponent), title: "Error"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
