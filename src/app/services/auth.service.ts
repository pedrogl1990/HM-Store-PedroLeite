import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  private isAuthenticated: boolean = false;
  authenticationChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  login() {
    this.isAuthenticated = true;
    this.authenticationChanged.emit(true);
  }

  logout() {
    this.isAuthenticated = false;
    this.authenticationChanged.emit(false);
  }

  getAuthentication() {
    return this.isAuthenticated;
  }

  updateAuthentication(isAuthenticated: boolean) {
    this.isAuthenticated = isAuthenticated;
    this.authenticationChanged.emit(this.isAuthenticated);
  }
}
