import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { }



  getAllProducts(pageNumber:number = 1):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageNumber}`)
    
  }
getCategoryDetails(id:string|null):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
    
  }
getCategory():Observable<any>{
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/categories")
    
  }
getProductDetails(id:string|null):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    
  }


  getAllbrands():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/brands')
  }
}
