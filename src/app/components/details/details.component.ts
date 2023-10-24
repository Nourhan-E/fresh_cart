import { CartService } from 'src/app/core/services/cart.service';


import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/core/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { ProDeta } from 'src/app/core/interfaces/pro-deta';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,CarouselModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  message: any;
constructor(private _productsService:ProductsService , private _activatedRoute:ActivatedRoute , private _renderer2:Renderer2 ,private _CartService:CartService) { }
    productId!:string|null;
    productsData:any = null

ngOnInit(): void {
 this._activatedRoute.paramMap.subscribe({
  next:(para)=>{
     this.productId =  para.get('id')
     
     
  }
 })


 this._productsService.getProductDetails(this.productId).subscribe({
   next:({data})=>{
    //  console.log(data);
     this.productsData=data
     console.log(this.productsData);
     
     
   }
 })
}


customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 1000,
  responsive: {
    0: {
      items: 1
    },
 
  },
  nav: true
}

callAddCart(id: any , element:any): void {

  this._renderer2.setAttribute(element, 'disabled', 'true')
  
      this._CartService.addToCart(id).subscribe({
        next: (res) => {
          console.log(res);
          this.message = res
            this._renderer2.removeAttribute(element, 'disabled')
            this._CartService.cartCount.next(res.numOfCartItems)
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 4000,
            icon: 'success',
            customClass: {
              timerProgressBar: 'progress-bar',
            },
            showClass: {
              popup: 'animate__animated animate__fadeInRightBig',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutRightBig',
            },
            title: res.message,
          });
  
        },
        error: (err) => {
          this._renderer2.removeAttribute(element, 'disabled')
        }
      })
    }
}
