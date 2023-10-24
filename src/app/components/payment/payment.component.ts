import { CartService } from 'src/app/core/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
constructor(private _ActivatedRoute:ActivatedRoute ,private _CartService:CartService){}
cartId:any;
paymentForm:FormGroup = new FormGroup({
  details:new FormControl(null,Validators.required),
  phone:new FormControl(null,Validators.required),
  city:new FormControl(null,Validators.required),
})

submitForm():void{
  console.log(this.paymentForm.value);
  this._CartService.checkOut(this.cartId,this.paymentForm.value).subscribe({
    next:(res)=>{
      // console.log(res);
      
  if(res.status == "success"){
    window.open(res.session.url , "_self")
  }
    },
    error:(err)=>{console.log(err)}
  })
}

ngOnInit(): void {
     this._ActivatedRoute.paramMap.subscribe({
      next:(para)=>{
         this.cartId =  para.get('id')
        //  console.log(this.cartId + "myiddd");
    },
    
     
      
    })
}
}
