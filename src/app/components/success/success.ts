import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success.html',
  styleUrl: './success.css'
})
export class Success implements AfterViewInit {
  // Success image (configurable)
  successImage = 'assets/celebrate.jpeg';

  ngAfterViewInit() {
    // Set initial state to hidden first
    gsap.set('.success-content', { opacity: 0, scale: 0.5, y: 50 });
    gsap.set('.success-title', { y: 50, scale: 0.5, opacity: 0 });
    gsap.set('.success-message', { y: 30, opacity: 0 });
    gsap.set('.success-frame', { scale: 0.5, rotation: -15, opacity: 0 });
    gsap.set('.success-footer', { y: 30, opacity: 0 });
    gsap.set('.heart-burst', { scale: 0, opacity: 0 });

    // Start animation after a frame
    setTimeout(() => {
      this.animateIn();
      this.createConfetti();
    }, 50);
  }

  animateIn() {
    const tl = gsap.timeline();

    tl.to('.success-content', {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.5)'
    })
      .to('.success-title', {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)'
      }, '-=0.4')
      .to('.success-message', {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out'
      }, '-=0.3')
      .to('.success-frame', {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'back.out(1.7)'
      }, '-=0.2')
      .to('.success-footer', {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out'
      }, '-=0.2')
      .to('.heart-burst', {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: 'back.out(2)'
      }, '-=0.4');
  }

  createConfetti() {
    const colors = ['#FF69B4', '#FFB6C1', '#DC143C', '#FF85A2', '#E91E63', '#FFD700', '#FFF', '#FF1493'];
    const container = document.body;

    for (let i = 0; i < 200; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = (Math.random() * 12 + 5) + 'px';
      confetti.style.height = (Math.random() * 12 + 5) + 'px';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
      confetti.style.animationDelay = (Math.random() * 2) + 's';
      container.appendChild(confetti);

      // Remove after animation
      setTimeout(() => {
        confetti.remove();
      }, 7000);
    }
  }
}
