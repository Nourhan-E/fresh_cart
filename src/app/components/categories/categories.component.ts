import { ProductsService } from './../../core/services/products.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
constructor(private _ProductsService:ProductsService){}
cateList:any=[]
ngOnInit(): void {
    this._ProductsService.getCategory().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cateList=res.data
      }
    })
}
}
