import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient: HttpClient) { }
  cartCount:BehaviorSubject<number> = new BehaviorSubject<number>(0)

  addToCart(proId: string): Observable<any> {
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/cart",
      {
        productId: proId
      },
 

    );
  }
  getCard(): Observable<any> {
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/cart",


    );
  }

  removeFromCart(productId: string): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, )
  }
  updateCartCount(productId: string, count: number): Observable<any> {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      count: count
    }, )
  }
  checkOut(id: any, formInfo:object): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
     {
      shippingAddress: formInfo,
    },
     )
  }
}

