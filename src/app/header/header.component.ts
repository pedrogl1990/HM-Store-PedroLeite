import { Component, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isAuthenticated: boolean = false;
  loggedInUser: any = '';
  screenWidth: number = 0;
  showMobile: boolean = false;
  showMenMobile: boolean = false;
  showWomanMobile: boolean = false;
  showChildMobile: boolean = false;
  showAccessoriesMobile: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private modalService: ModalService,
    private router: Router,
    private cartService: CartService
  ) {
    this.screenWidth = window.innerWidth;
  }

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
    return this.userService.getLoggedUserName();
  }

  logout() {
    this.authService.logout();
    this.cartService.clearCart();
    localStorage.clear();
    this.router.navigate(['/']);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
  }

  showMobileMenu() {
    this.showMobile = !this.showMobile;
  }

  showMenMobileMenu() {
    this.showMenMobile = !this.showMenMobile;
  }

  showWomanMobileMenu() {
    this.showWomanMobile = !this.showWomanMobile;
  }

  showChildMobileMenu() {
    this.showChildMobile = !this.showChildMobile;
  }

  showAccessoriesMobileMenu() {
    this.showAccessoriesMobile = !this.showAccessoriesMobile;
  }

  isAdminUser() {
    const loggedInUser = this.userService.getLoggedInUser();
    return loggedInUser && loggedInUser.admin;
  }
}
