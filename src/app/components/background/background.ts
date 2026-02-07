import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FloatingHeart {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: string;
  wiggleAmount: number;
  opacity: number;
  layer: number;
}

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './background.html',
  styleUrl: './background.css'
})
export class Background implements OnInit {
  hearts: FloatingHeart[] = [];

  ngOnInit() {
    this.generateFloatingHearts();
  }

  generateFloatingHearts() {
    // Generate 40 hearts for a fuller background
    for (let i = 0; i < 40; i++) {
      const layer = Math.floor(Math.random() * 3);
      this.hearts.push({
        id: i,
        left: Math.random() * 100 + '%',
        delay: Math.random() * 20 + 's',
        duration: (Math.random() * 15 + 12) + 's',
        size: this.getSizeForLayer(layer),
        wiggleAmount: Math.random() * 30 + 15, // 15-45px wiggle
        opacity: this.getOpacityForLayer(layer),
        layer: layer
      });
    }
  }

  getSizeForLayer(layer: number): string {
    switch (layer) {
      case 0: return (Math.random() * 15 + 15) + 'px'; // Back: smaller
      case 1: return (Math.random() * 20 + 25) + 'px'; // Mid: medium
      case 2: return (Math.random() * 25 + 35) + 'px'; // Front: larger
      default: return '25px';
    }
  }

  getOpacityForLayer(layer: number): number {
    switch (layer) {
      case 0: return 0.3 + Math.random() * 0.2; // Back: 0.3-0.5
      case 1: return 0.5 + Math.random() * 0.2; // Mid: 0.5-0.7
      case 2: return 0.6 + Math.random() * 0.3; // Front: 0.6-0.9
      default: return 0.5;
    }
  }
}
