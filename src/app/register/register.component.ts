import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  newUser: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    admin: false,
    activo: false,
    morada: '',
    cp: '',
    pais: '',
  };

  constructor(private userService: UserService, private router: Router) {}

  showConfirmation: boolean = false;

  onRegister(registerForm: any) {
    if (registerForm.valid) {
      if (this.userService.isEmailRegistered(this.newUser.email)) {
        registerForm.controls.newUserEmail.setErrors({ emailExists: true });
        return;
      }

      const passwordPattern =
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
      if (!passwordPattern.test(this.newUser.password)) {
        registerForm.controls.newUserPassword.setErrors({
          invalidPassword: true,
        });
        return;
      }

      this.userService.createUser(this.newUser).subscribe(
        (response) => {
          console.log(response);
          this.showConfirmation = true;
          registerForm.resetForm();
        },
        (error) => console.log(error)
      );
    } else {
      registerForm.control.markAllAsTouched();
    }
  }

  getInitialUserState(): User {
    return {
      id: 0,
      name: '',
      email: '',
      password: '',
      admin: false,
      activo: false,
      morada: '',
      cp: '',
      pais: '',
    };
  }

  isFormEmpty(): boolean {
    return (
      !this.newUser.name ||
      !this.newUser.email ||
      !this.newUser.password ||
      !this.newUser.morada ||
      !this.newUser.cp ||
      !this.newUser.pais
    );
  }

  onOkClick() {
    this.showConfirmation = false;
    this.router.navigate(['/']);
  }
}
