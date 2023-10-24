import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule ,RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
constructor(private _CartService: CartService,private _HttpClient:HttpClient) {}
cartDetails:any =null;
ngOnInit(): void {
    this._CartService.getCard().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartDetails = res.data
      }
    })
}

removeItem(id:string){
  this._CartService.removeFromCart(id).subscribe({
    next:(response)=>{
      this.cartDetails = response.data;
  this._CartService.cartCount.next(response.numOfCartItems)
    }
  })
}
updateCartCount(id:string,count:number){
  this._CartService.updateCartCount(id,count).subscribe({
    next:(response)=>{
      this.cartDetails = response.data;
    }
  })
}
}
