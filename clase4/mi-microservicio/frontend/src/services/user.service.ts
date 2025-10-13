import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface User {
  userId: number;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl =`${environment.endPoint}/users`; 
  public loginStatus = new BehaviorSubject<User|undefined>(undefined);

  constructor(private http: HttpClient) {}

  getLoginStatus(){
    return this.loginStatus.asObservable();
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }


  createUser(name:string, email: string, password: string): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = {name, email, password}
    return this.http.post<User>(this.apiUrl, body, {headers: headers});
  }

  login(email: string, password: string): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = {email, password}
    return this.http.post<User>(this.apiUrl + '/login', body, {headers: headers});
  }
}
