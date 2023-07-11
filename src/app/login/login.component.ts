import { Component, Input } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Input()
  visibleModal: boolean = true;
  credentialsError: boolean = false;

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService) {}

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
      this.visibleModal = false;
      this.userService.login();
    }
  }

  closeModal() {
    this.visibleModal = false;
  }
}
