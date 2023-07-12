import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalOpenSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public modalOpen = this.modalOpenSubject.asObservable();

  constructor() {}

  openModal() {
    this.modalOpenSubject.next(true);
  }

  closeModal() {
    this.modalOpenSubject.next(false);
  }
}
