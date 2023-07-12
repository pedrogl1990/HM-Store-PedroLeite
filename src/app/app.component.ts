import { Component } from '@angular/core';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'HM-Store-PedroLeite';

  constructor(public modalService: ModalService) {}

  closeModal() {
    this.modalService.closeModal();
  }
}
