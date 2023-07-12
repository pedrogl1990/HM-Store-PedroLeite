import { Injectable } from '@angular/core';

interface User {
  email: string;
  password: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    {
      email: 'pgleite1990@gmail.com',
      password: 'pedro1234',
      name: 'Pedro Leite',
    },
    {
      email: 'a.rita@hotmail.com',
      password: 'rita1234',
      name: 'Ana Rita Dias',
    },
  ];
  constructor() {}

  private loggedInUser!: User;

  getUser(email: string, password: string) {
    const user = this.users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      this.loggedInUser = user;
      localStorage.setItem('loggedUser', user.name);
    }

    return user;
  }

  getLoggedInUserName() {
    return this.loggedInUser ? this.loggedInUser.name : '';
  }
}
