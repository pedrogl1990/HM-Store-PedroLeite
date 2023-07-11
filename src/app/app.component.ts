import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'HM-Store-PedroLeite';

  visibleModal = true;

  closeModal() {
    this.visibleModal = false;
  }
}
