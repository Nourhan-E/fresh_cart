import { CartService } from './../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { product } from 'src/app/core/interfaces/product';
import { Search2Pipe } from 'src/app/core/pipes/search2.pipe';
import { ProductsService } from 'src/app/core/services/products.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule, RouterLink,Search2Pipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _productsService: ProductsService, private _CartService: CartService ,private _renderer2:Renderer2 ) { }
  products: product[] = []
  Category: any = []
  loading: boolean = false;
  message: any = ''
  term:string=""

  ngOnInit(): void {
    this._productsService.getAllProducts().subscribe({
      next: (res) => {
        // console.log( this.products = res);
        this.products = res.data;

      }
    })
    this._productsService.getCategory().subscribe({
      next: (res) => {
        console.log(res.data);
        this.Category = res.data;

      }
    })

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



  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 1000,
    responsive: {
      0: {
        items: 1
      },

    },
    nav: false
  }
  pro: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },

    },
    nav: false
  }
  cateSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 2000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }

    },
    nav: false
  }

}
