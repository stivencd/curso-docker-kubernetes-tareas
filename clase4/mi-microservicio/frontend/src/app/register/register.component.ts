import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  signupForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }


  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
    this.isLoading = true;
    const { fullName, email, password } = this.signupForm.value;
    console.log('Sign Up:', fullName, email, password);
    this.userService.createUser(fullName, email,password).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      }
    })
  }
}
