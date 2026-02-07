import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css'
})
export class Homepage implements AfterViewInit {
  @Output() onStart = new EventEmitter<void>();

  ngAfterViewInit() {
    // Set initial state to hidden first, then animate in
    gsap.set('.homepage-content', { opacity: 0, scale: 0.8, y: 30 });
    gsap.set('.intro-hearts', { scale: 0.3, opacity: 0 });
    gsap.set('.intro-title', { y: 40, opacity: 0 });
    gsap.set('.intro-subtitle', { y: 30, opacity: 0 });
    gsap.set('.sparkle-container', { scale: 0, opacity: 0 });
    gsap.set('.btn-start', { scale: 0.5, opacity: 0 });

    // Start animation after a frame
    setTimeout(() => this.animateIntro(), 50);
  }

  animateIntro() {
    const tl = gsap.timeline();

    tl.to('.homepage-content', {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      ease: 'back.out(1.7)'
    })
      .to('.intro-hearts', {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      }, '-=0.3')
      .to('.intro-title', {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out'
      }, '-=0.2')
      .to('.intro-subtitle', {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out'
      }, '-=0.2')
      .to('.sparkle-container', {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'back.out(1.7)'
      }, '-=0.2')
      .to('.btn-start', {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
      }, '-=0.2');
  }

  startProposal() {
    // Animate out and emit event
    gsap.to('.homepage-content', {
      opacity: 0,
      scale: 0.9,
      y: -30,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        this.onStart.emit();
      }
    });
  }
}
