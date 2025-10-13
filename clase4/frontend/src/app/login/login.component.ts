import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User, UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    const { email, password } = this.loginForm.value;
    this.userService.login( email,password).subscribe({
      next: (resp: User) => {
        console.log('user....',resp);
        this.userService.loginStatus.next(resp);

        this.router.navigate(['/products']);
        this.isLoading = false;
        window.localStorage.setItem('user', JSON.stringify(resp));
      },
      error: () => {
          alert("Usuario incorrecto")
        this.isLoading = false;

      },
       complete: () => {
        this.isLoading = false;
      }
    })
  }
}
