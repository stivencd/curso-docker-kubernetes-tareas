import { Component, OnInit } from '@angular/core';
import { Cart, CartItem, CartService } from '../../services/cart.service';
import { Product, ProductsService } from 'src/services/products.service';
import { Router } from '@angular/router';
import { User, UserService } from 'src/services/user.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = new Array();
  cart: Cart  | undefined;
  user: User | undefined;

  constructor(private cartService: CartService, 
              private productService: ProductsService,
              private userService: UserService,
              private router: Router) {}

  ngOnInit(): void {
    const storage = window.localStorage.getItem('user');
    if(!storage) {
      this.router.navigate(['/login']);
      return;
    }
    this.user = JSON.parse(storage) as User;
    this.userService.loginStatus.next(this.user);
    this.productService.getProducts().subscribe({
      next: (resp: Product[]) => {
        this.products = resp.map(product => ({
          ...product,  
          quantity: 1  
        }));
      },
      error: (err) => {
        console.error('Error fetching products', err);
      }
    });
    this.cartService.getCart(this.user.userId).subscribe({
      next: (cart) => {
        console.log('cart', cart);
        
        if (cart) {
          this.cart = cart;
        } else {
          console.log('No cart data available');
        }
      }, error: (error) => {

      }
    })
  }

  increaseQuantity(product: Product) {
    if (product.quantity < product.stock) {
      product.quantity++;
    }
  }

  decreaseQuantity(product: Product) {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  addToCart(product: Product) {
    // Ensure quantity is within available stock range
    if (product.quantity < 1 || product.quantity > product.stock) {
      alert('Quantity must be between 1 and available stock.');
      return;
    }

    const cartItem: CartItem = {
      userId: this.user?.userId!,
      productId: product.productId,
      quantity: product.quantity,
      price: Number(product.price),
      product: product,
      cartId: this.cart?.cartId,
      status: 'active'
    };
    this.cartService.addToCart(cartItem).subscribe({
      next: resp => console.log('addcart: ', resp)
      
    });
  }
}
