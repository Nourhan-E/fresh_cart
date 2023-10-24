import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxPaginationModule } from 'ngx-pagination';
import { product } from 'src/app/core/interfaces/product';
import { Search2Pipe } from 'src/app/core/pipes/search2.pipe';
import { ProductsService } from 'src/app/core/services/products.service';
import Swal from 'sweetalert2';
import { CartService } from './../../core/services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,RouterLink,NgxPaginationModule,Search2Pipe,FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(private _productsService: ProductsService, private _CartService: CartService ,private _renderer2:Renderer2 ) { }
  products: product[] = []
  Category: any = []
  loading: boolean = false;
  message: any = ''
  pageSize:number=0;
  currentPage:number=1;
  totalItems:number=0;
  term:string=""


  ngOnInit(): void {
    this._productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        this.currentPage= res.metadata.currentPage
        this.pageSize= res.metadata.limit
        this.totalItems= res.results
        // console.log(this.currentPage );
        // console.log(this.pageSize );
        // console.log(this.totalItems );
        
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

  pageChanged(event:any){
    console.log(event)
    this._productsService.getAllProducts(event).subscribe({
      next: (res) => {
        this.products = res.data;
        this.currentPage= res.metadata.currentPage
        this.pageSize= res.metadata.limit
        this.totalItems= res.results
        window.scrollTo(0,0)
        // console.log(this.currentPage );
        // console.log(this.pageSize );
        // console.log(this.totalItems );
        
      }
    })
  
    }
  }



