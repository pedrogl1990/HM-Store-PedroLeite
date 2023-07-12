import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isAuthenticated: boolean = false;
  loggedInUser: any = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.isAuthenticated = this.getLoggedUser() !== null;
    this.loggedInUser = this.getLoggedUser() || null;

    this.authService.authenticationChanged.subscribe(
      (isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
      }
    );
  }

  openModal() {
    this.modalService.openModal();
  }

  getUsername() {
    return this.userService.getLoggedInUserName();
  }

  getLoggedUser() {
    return localStorage.getItem('loggedUser');
  }

  logout() {
    this.authService.logout();
    localStorage.removeItem('loggedInUserName');
    localStorage.removeItem('loggedUser');
  }
}
