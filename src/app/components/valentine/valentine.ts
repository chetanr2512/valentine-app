import { Component, AfterViewInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-valentine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './valentine.html',
  styleUrl: './valentine.css'
})
export class Valentine implements AfterViewInit {
  @Output() onYes = new EventEmitter<void>();

  // Button state
  noClickCount = 0;
  yesScale = 1;
  noButtonHidden = false;
  maxNoClicks = 5;
  showCouplePreview = false;
  yesButtonCentered = false;

  // Images
  coupleImage = 'assets/please.jpeg';

  @ViewChild('yesButton') yesButton!: ElementRef;
  @ViewChild('noButton') noButton!: ElementRef;

  ngAfterViewInit() {
    setTimeout(() => {
      gsap.fromTo('.valentine-content',
        { opacity: 0, scale: 0.85, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' }
      );
    }, 50);
  }

  onYesClick() {
    gsap.to('.valentine-content', {
      scale: 1.05,
      duration: 0.15,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to('.valentine-content', {
          opacity: 0,
          scale: 0.9,
          y: -30,
          duration: 0.4,
          ease: 'power2.inOut',
          onComplete: () => {
            this.onYes.emit();
          }
        });
      }
    });
  }

  onNoClick(event: MouseEvent) {
    this.noClickCount++;

    // Increase yes button size
    this.yesScale += 0.12;
    if (this.yesButton?.nativeElement) {
      gsap.to(this.yesButton.nativeElement, {
        scale: this.yesScale,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)'
      });
    }

    // Show couple preview after 2 clicks
    if (this.noClickCount >= 2 && !this.showCouplePreview) {
      this.showCouplePreview = true;
    }

    if (this.noClickCount >= this.maxNoClicks) {
      if (this.noButton?.nativeElement) {
        gsap.to(this.noButton.nativeElement, {
          opacity: 0,
          scale: 0,
          rotation: 360,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            this.noButtonHidden = true;
            this.yesButtonCentered = true;

            // Reset yes button position and animate to center
            if (this.yesButton?.nativeElement) {
              gsap.to(this.yesButton.nativeElement, {
                x: 0,
                y: 0,
                duration: 0.4,
                ease: 'power2.out'
              });
            }
          }
        });
      }
      this.pulseYesButton();
    } else {
      this.moveNoButton();
    }
  }

  moveNoButton() {
    if (!this.noButton?.nativeElement) return;

    const button = this.noButton.nativeElement;

    // Move button to fixed position OUTSIDE the card
    // Calculate random position on the screen
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const padding = 100;

    const randomX = padding + Math.random() * (viewportWidth - padding * 2 - 150);
    const randomY = padding + Math.random() * (viewportHeight - padding * 2 - 60);

    // First shake, then move to fixed position
    gsap.timeline()
      .to(button, { x: '-=8', duration: 0.04 })
      .to(button, { x: '+=16', duration: 0.04 })
      .to(button, { x: '-=8', duration: 0.04 })
      .set(button, {
        position: 'fixed',
        left: randomX,
        top: randomY,
        x: 0,
        y: 0,
        margin: 0,
        zIndex: 1000
      });
  }

  pulseYesButton() {
    if (!this.yesButton?.nativeElement) return;

    const button = this.yesButton.nativeElement;
    gsap.timeline()
      .to(button, { scale: this.yesScale * 1.15, duration: 0.2, ease: 'power2.out' })
      .to(button, { scale: this.yesScale, duration: 0.2, ease: 'power2.in' });
  }

  getMessage(): string {
    switch (this.noClickCount) {
      case 0: return 'Please say yes!';
      case 1: return 'Pretty please?';
      case 2: return "I'll be so happy!";
      case 3: return "Don't make me cry...";
      case 4: return 'One more chance...';
      default: return "There's no escape now!";
    }
  }

  getEmoji(): string {
    switch (this.noClickCount) {
      case 0: return '💕';
      case 1: return '🥺';
      case 2: return '🥹';
      case 3: return '😢';
      case 4: return '💔';
      default: return '😏💕';
    }
  }
}
