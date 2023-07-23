import { Component } from '@angular/core';
import { User } from '../interfaces/users';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  loggedInUser: User;
  showEditSection: boolean = false;
  updatedUser: User;
  originalUser: User;
  password: string = '';
  passwordCheck: string = '';
  passwordsMismatch: boolean = false;
  passwordValid: boolean = false;
  showSuccessMessage: boolean = false;

  constructor(private userService: UserService) {
    this.loggedInUser = this.userService.getLoggedInUser();
    this.updatedUser = { ...this.loggedInUser };
    this.originalUser = { ...this.loggedInUser };
  }
  hidePassword(): string {
    return '*'.repeat(this.loggedInUser?.password.length || 0);
  }

  toggleEditSection() {
    if (!this.showEditSection) {
      this.userService
        .getUser(this.loggedInUser.email, this.loggedInUser.password)
        .subscribe((user) => {
          if (user) {
            this.updatedUser = { ...user };
          } else {
            console.log('User não encontrado.');
          }
          this.showEditSection = !this.showEditSection;
        });
    } else {
      this.showEditSection = !this.showEditSection;
    }
  }

  updateUserInfo(event: Event) {
    event.preventDefault();

    if (!this.passwordsMismatch && this.passwordValid) {
      this.updatedUser.password = this.password;
      this.userService.updateUser(this.updatedUser).subscribe(
        () => {
          this.userService
            .getUser(this.updatedUser.email, this.updatedUser.password)
            .subscribe((user) => {
              if (user) {
                this.originalUser = { ...user };
                this.loggedInUser = { ...user };
                localStorage.setItem(
                  'loggedInUser',
                  JSON.stringify(this.loggedInUser)
                );
                this.toggleEditSection();
                this.showSuccessMessage = true;
                setTimeout(() => (this.showSuccessMessage = false), 3000);
              } else {
                console.log('User não encontrado.');
              }
            });
        },
        (error) => {
          console.error('Update failed: ', error);
          this.password = '';
          this.passwordCheck = '';
        }
      );
    } else {
      console.log('As passwords não coincidem ou não são válidas.');
      this.password = '';
      this.passwordCheck = '';
    }
  }

  checkPasswords() {
    if (this.password === '' || this.passwordCheck === '') {
      this.passwordsMismatch = false;
      this.passwordValid = false;
    } else {
      this.passwordsMismatch = this.password !== this.passwordCheck;
      this.passwordValid = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/.test(
        this.password
      );
    }
  }
}
