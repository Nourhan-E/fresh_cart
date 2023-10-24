import { ForgetpassService } from './../../core/services/forgetpass.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {
  loginForm: any;
constructor(private _router: Router, private _AuthService: AuthService, private _ForgetpassService:ForgetpassService , private _Router:Router) { }
  loading: boolean = false;
  step1:boolean=true;
  step2:boolean=false;
  step3:boolean=false;
  email: string = "";
  userMess:string=""

  // ! step 1 
  emailform: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  submitForm(): void {

    console.log(this.emailform.value);
    const userEmail = this.emailform.value;
    this.email = userEmail.email
  
    this._ForgetpassService.forrgetPass(userEmail).subscribe({
      next: (res) => {
        console.log(res);
        this.userMess = res.message
          this.step1=false
          this.step2=true
        
      },
      error: (err) => {
        console.log(err);
        this.userMess = err.error.message
      }
    })

  }






    // ! step 2

  resetCodeForm: FormGroup = new FormGroup({

    resetCode: new FormControl(null, [Validators.required]),

  });
  submitRestetForm(): void {
    let userCode = this.resetCodeForm.value;
    this.loading = true;
      this._ForgetpassService.resetCode(userCode).subscribe({
        next: (res) => {
          console.log(res);
          
          if(res.status =="Success"){
            this.step2=false
            this.step3=true
            this.userMess = res.message
          }
          
        },
        error: (err) => {
          console.log(err);
          this.userMess = err.error.message
     
        }
      })
  }

  // ! step 3

  resetNewPassword: FormGroup = new FormGroup({
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
  });

  submitRestetPass(): void {
    let newPass = this.resetNewPassword.value;
    newPass.email = this.email
    console.log(newPass);
    this._ForgetpassService.resetpass(newPass).subscribe({
      next: (res) => {
        console.log(res);
        this.userMess = res.message
        if(res.token){
            localStorage.setItem('userToken', res.token);
            Swal.fire({
              toast: false,
              position: 'center',
              showConfirmButton: true,
              icon: 'success',
              showClass: {
                popup: 'animate__animated animate__bounceInDown',
              },
              hideClass: {
                popup: 'animate__animated animate__bounceOutDown',
              },
              title: `Your password has been successfully changed`,
            });
            this._Router.navigate(['/home']);
        }
        
      },
      error: (err) => {
        console.log(err);
        this.userMess = err.error.message
      }
    })
  }
}
