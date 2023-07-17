import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

interface User {
  name: string;
  email: string;
  password: string;
  admin: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [];
  private apiUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}

  private loggedInUser!: User;

  getUser(email: string, password: string) {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map((users) =>
        users.find((user) => user.email === email && user.password === password)
      ),
      tap((user) => {
        if (user) {
          this.loggedInUser = user;
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
    return this.loggedInUser;
  }
}
