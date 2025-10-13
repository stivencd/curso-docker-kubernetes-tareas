import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Product {
  productId: number;
  name: string;
  description: string;
  price: string,
  stock: number,
  imageUrl: string
  quantity: number
}


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl =`${environment.endPoint}/products/`; 
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
