import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/users';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css'],
})
export class UserCreationComponent {
  profileName!: string;
  profileEmail!: string;
  profilePassword!: string;
  adminUser!: boolean;
  activeUser!: boolean;
  profileAddress!: string;
  profilePC!: string;
  profileCountry!: string;
  userCreated: boolean = false;
  emailError: boolean = false;
  passwordError: boolean = false;

  constructor(private userService: UserService) {}

  createUser(form: any) {
    this.emailError = false;
    this.passwordError = false;

    if (!this.isValidEmail(this.profileEmail)) {
      this.emailError = true;
      return;
    }
    if (!this.isValidPassword(this.profilePassword)) {
      this.passwordError = true;
      return;
    }

    const newUser: User = {
      id: 0,
      name: this.profileName,
      email: this.profileEmail,
      password: this.profilePassword,
      admin: this.adminUser || false,
      activo: this.activeUser || false,
      morada: this.profileAddress,
      cp: this.profilePC,
      pais: this.profileCountry,
    };

    this.userService.createUser(newUser).subscribe((user: User) => {
      console.log('Novo user criado:', user);

      this.userCreated = true;

      this.profileName = '';
      this.profileEmail = '';
      this.profilePassword = '';
      this.adminUser = false;
      this.activeUser = false;
      this.profileAddress = '';
      this.profilePC = '';
      this.profileCountry = '';

      setTimeout(() => {
        this.userCreated = false;
      }, 3000);
    });
  }

  isValidEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  isValidPassword(password: string) {
    const re = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/;
    return re.test(password);
  }
}
