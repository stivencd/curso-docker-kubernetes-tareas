import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  cartId: number = 0;

  constructor(private cartService: CartService, private router:Router, private userService: UserService) {}

  ngOnInit(): void {
    const storage = window.localStorage.getItem('user');
    if(!storage) {
      this.router.navigate(['/login']);
      return;
    }
    const user = JSON.parse(storage);
    this.userService.loginStatus.next(user);
    this.cartService.cart$.subscribe((cart) => {
      this.cartItems = cart; 
      this.total = this.cartService.getTotal();
      console.log('Updated cart in component:', this.cartItems);
    });

    this.cartService.getCart(user.userId).subscribe((cart) => {
      if (cart) {
        this.cartId = cart.cartId;
        this.cartItems = cart.CartItems;
        this.total = this.cartService.getTotal();
      } else {
        console.log('No cart data available');
      }  
    });
  }

  removeItem(productId: number) {
    console.log('pid', productId);
    
    this.cartService.removeFromCart(this.cartId, productId).subscribe();
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
