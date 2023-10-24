import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetpassService {

  constructor(private _HttpClient:HttpClient) { }

  forrgetPass(email:object):Observable<any>{
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",email)
  }
  resetCode(resetCode:object):Observable<any>{
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",resetCode)
  }
  resetpass(resetPass:object):Observable<any>{
    return this._HttpClient.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",resetPass)
  }

}
