import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/services/cart.service';
import { User, UserService } from 'src/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  user: User | undefined;
  currentPath: string = '';
  cartItemCount: number =0;
  
  constructor(private router: Router, 
              private cartService: CartService,
              private userService: UserService) {}

  ngOnInit() {
    const storage = window.localStorage.getItem('user');
    this.user = storage ? JSON.parse(storage) as User : undefined;
    this.cartService.getItemCount().subscribe({
      next: count => this.cartItemCount = count
    });
    this.userService.getLoginStatus().subscribe({
      next: (user) => this.user = user
    });

  }

  logout() {
    this.user= undefined;
    window.localStorage.removeItem('user');
    this.router.navigate(['login']);

  }
}
