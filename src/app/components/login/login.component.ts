import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './../../core/services/auth.service';
declare let Swal: any;
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _router: Router, private _AuthService: AuthService) { }
  loading: boolean = false;
  loginForm: FormGroup = new FormGroup({

    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),

  });
  submitForm() {
    const userData = this.loginForm.value;
    if (this.loginForm.valid) {
      this.loading = true;
      this._AuthService.login(userData).subscribe({
        next: (res) => {
          localStorage.setItem('userToken', res.token);
          this._router.navigate(['/home']);
          this._AuthService.decodeToken()

        },
        error: (err) => {
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
