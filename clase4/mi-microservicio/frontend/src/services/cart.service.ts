// src/app/cart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from './products.service';
import { environment } from 'src/environments/environment';


export interface CartItem {
  userId: number,
  productId: number;
  quantity: number;
  price: number;
  product: Product;
  cartId?: number;
  status: string;
}

export interface Cart {
  cartId: number,
  status: string,
  CartItems: CartItem[]
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cart: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cart);
  public cart$ = this.cartSubject.asObservable(); 
  private itemCount = new BehaviorSubject<number>(0);
  private apiUrl =`${environment.endPoint}/cart`; 

  constructor(private http: HttpClient) { }


  getItemCount() {
    return this.itemCount.asObservable();
  }

  getCart(userId: number): Observable<Cart | null> {
    return this.http.get<Cart>(`${this.apiUrl}/${userId}`).pipe(
      tap((cart: Cart) => {
        console.log('serv', cart);
        
        const array = [];
        for (const item of cart.CartItems) {
          if (array.length === 0) {
            array.push(item);
          } else {
            const index = array.findIndex(el => el.product.productId === item.product.productId);
            if (index === -1) {
              array.push(item);
            } else {
              array[index].quantity += item.quantity;
            }
          }
        }
        this.itemCount.next(array.reduce((acc,item)=> acc+item.quantity, 0));
        this.cart = array;
        console.log('Updated cart:', this.cart);  
      }),
      map((cart: Cart) => {
        return { ...cart, CartItems: this.cart }; // You can customize what you return
      }),
      catchError((error) => {
        console.error('Error fetching cart:', error);
        return of(null);
      })
    );
  }


  addToCart(product: CartItem): Observable<any> {
    const index = this.cart.findIndex((item) => item.productId === product.productId);
    if (index === -1) {
      this.cart.push({ ...product });
    } else {
      this.cart[index].quantity += product.quantity;
    }
    this.cartSubject.next(this.cart);
    const currectCount = this.itemCount.getValue();
    this.itemCount.next(currectCount + product.quantity);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.apiUrl, product, {headers: headers})
  }

  removeFromCart(cartId:number, productId: number): Observable<any> {
    const currectCount = this.itemCount.getValue();
    if(currectCount>0) this.itemCount.next(currectCount -1);
    this.cart = this.cart.filter((item) => item.product.productId !== productId);
    this.cartSubject.next(this.cart);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = { cartId, productId };
    return this.http.put(this.apiUrl, body, { headers: headers }).pipe(
      tap((response) => {
        console.log('Backend response:', response);
      }),
      catchError((error) => {
        console.error('Error during removing from cart:', error);
        return throwError(error);
      })
    );
  }

  clearCart() {
    this.cart = [];
    this.cartSubject.next(this.cart);
  }

  getTotal() {
    return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }
}
