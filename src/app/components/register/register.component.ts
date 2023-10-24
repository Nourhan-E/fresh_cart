import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './../../core/services/auth.service';

declare let Swal: any;

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

constructor( private _router: Router , private _AuthService:AuthService){}
loading:boolean = false;
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
    rePassword: new FormControl(null,[Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  } , {validators: this.confirmPassword } as FormControlOptions   );



  confirmPassword(group:FormGroup):void{
    const password = group.get('password');
    const rePassword = group.get('rePassword');
    if (rePassword?.value == ''){
      rePassword.setErrors({required:true});
    }
    else if (password?.value != rePassword?.value){
      rePassword?.setErrors({notSame:true});
    }

    
  }




  submitForm(){
    const userData = this.registerForm.value;
    if (this.registerForm.valid){
      this.loading = true;
      this._AuthService.register(userData).subscribe({
        next: (res)=>{
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
            title: 'Your account was created successfully',
          });

          this._router.navigate(['/login']);
          
        },
        error: (err)=>{
          console.log(err.error);
          console.log(err);
          
          Swal.fire({
            toast: false,
            position: 'center',
            showConfirmButton: true,
            icon: 'error',
            showClass: {
              popup: 'animate__animated animate__bounceInDown',
            },
            hideClass: {
              popup: 'animate__animated animate__bounceOutDown',
            },
            title: `${err.error.message}`,
          });
          this.loading = false;
          
        }
      })
    }
    
  }

}


