import { ProductsService } from 'src/app/core/services/products.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-catedetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catedetails.component.html',
  styleUrls: ['./catedetails.component.css']
})
export class CatedetailsComponent implements OnInit {
constructor(private _ActivatedRoute:ActivatedRoute , private _ProductsService:ProductsService){}
cateId:string|null=''
ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(para)=>{
         this.cateId =  para.get('id')
    },
    
     
      
    })

this._ProductsService.getCategoryDetails(this.cateId).subscribe({
  next:(res)=>{
console.log(res);

  }
})
}
}
