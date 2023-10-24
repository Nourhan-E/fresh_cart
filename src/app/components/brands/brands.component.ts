import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {
  brands:any[]=[]
  constructor(private _ProductsService :ProductsService){
    this._ProductsService.getAllbrands().subscribe((res)=>{
      console.log(res.data);
      this.brands=res.data


     
      
    })

   
  }
  onbrandsClic(prand:any){
    const massage =`prands name:${prand?.name}, image :${prand?.image}`
    alert(massage)


  }

}
