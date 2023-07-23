import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/users';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css'],
})
export class UsersManagementComponent implements OnInit {
  users: User[] = [];
  private unsubscribe$ = new Subject();

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadAllUsers();

    this.userService.userCreated$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((newUser: User) => {
        this.users.push(newUser);
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  loadAllUsers() {
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Erro ao carregar users:', error);
      }
    );
  }

  editUser(user: User) {
    this.userService.updateUser(user).subscribe(
      () => {
        console.log('User atualizado com sucesso!');
      },
      (error) => {
        console.error('Erro ao atualizar user:', error);
      }
    );
  }
}
