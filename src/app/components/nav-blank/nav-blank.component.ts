import { CartService } from 'src/app/core/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent implements OnInit {
constructor(private _Router:Router ,private _CartService:CartService){}
cartNum:number=0
ngOnInit(): void {
    this._CartService.cartCount.subscribe({
      next:(data)=>{
        console.log('nav' , data);
          this.cartNum=data
        
      }
    })

    this._CartService.getCard().subscribe({
      next:(res)=>{
        this.cartNum = res.numOfCartItems
        console.log('helllo' , this.cartNum);
        
      }
    })
}

signOut():void{
  localStorage.removeItem('userToken');
  this._Router.navigate(['/login']);
}
}
