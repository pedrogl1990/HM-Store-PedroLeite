import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { AuthService } from './auth.service';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  admin: boolean;
  activo: boolean;
  morada: string;
  cp: string;
  pais: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  users: User[] = [];
  constructor(private http: HttpClient, private authService: AuthService) {}

  private loggedInUser!: User;

  getUser(email: string, password: string) {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map((users) =>
        users.find((user) => user.email === email && user.password === password)
      ),
      tap((user) => {
        if (user) {
          this.loggedInUser = user;
          this.authService.login(user);
          localStorage.setItem('loggedUser', user.name);
        }
      })
    );
  }

  getLoggedInUserName() {
    return this.loggedInUser ? this.loggedInUser.name : '';
  }

  getLoggedUserName() {
    return localStorage.getItem('loggedUser');
  }

  getLoggedInUser() {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
  }

  getAllUsers() {
    return this.http.get<User[]>(this.apiUrl);
  }

  updateUser(user: User) {
    return this.http.put(this.apiUrl + '/' + user.id, user);
  }
}
