import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  @Input() images: string[] = [];
  @Input() title: string = '';
  activeImage: string = '';

  ngOnInit() {
    const numberOfImages = this.images.length;
    const intervalTime = 3000;
    let currentIndex = 0;
    this.activeImage = this.images[0];

    const changeImage = () => {
      currentIndex = (currentIndex + 1) % numberOfImages;
      this.activeImage = this.images[currentIndex];
    };

    setInterval(changeImage, intervalTime);
  }
}
