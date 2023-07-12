import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentialsError: boolean = false;
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private modalService: ModalService
  ) {}

  submitForm() {
    const user = this.userService.getUser(this.email, this.password);
    if (!this.email.match('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}')) {
      this.credentialsError = true;
      this.errorMessage = 'O e-mail tem um formato incorreto!';
    } else if (this.email === '' || this.password === '') {
      this.credentialsError = true;
      this.errorMessage = 'Os dois campos são de preenchimento obrigatório!';
    } else if (!user) {
      this.credentialsError = true;
      this.errorMessage = 'Utilizador inexistente!';
    } else {
      this.modalService.closeModal();
      this.authService.updateAuthentication(true);
    }
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
