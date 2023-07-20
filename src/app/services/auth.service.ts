import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.isAuthenticated = true;
      this.loggedInUser = JSON.parse(user);
    }
  }

  private isAuthenticated: boolean = false;
  private loggedInUser: any = null;
  authenticationChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  login(user: any) {
    this.isAuthenticated = true;
    this.loggedInUser = user;
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    this.authenticationChanged.emit(true);
  }

  logout() {
    this.isAuthenticated = false;
    this.loggedInUser = null;
    this.authenticationChanged.emit(false);
  }

  getAuthentication() {
    return this.isAuthenticated;
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }

  updateAuthentication(isAuthenticated: boolean) {
    this.isAuthenticated = isAuthenticated;
    this.authenticationChanged.emit(this.isAuthenticated);
  }

  public getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
