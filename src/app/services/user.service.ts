import { Injectable } from '@angular/core';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    { email: 'pgleite1990@gmail.com', password: 'pedro1234' },
    { email: 'a.rita@hotmail.com', password: 'rita1234' },
  ];
  constructor() {}

  private isAuthenticated: boolean = false;

  login() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
  }

  getUser(email: string, password: string) {
    return this.users.find(
      (user) => user.email === email && user.password === password
    );
  }
}
