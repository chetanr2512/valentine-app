import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Background } from './components/background/background';
import { Homepage } from './components/homepage/homepage';
import { Valentine } from './components/valentine/valentine';
import { Success } from './components/success/success';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Background, Homepage, Valentine, Success],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  currentScreen: 'homepage' | 'valentine' | 'success' = 'homepage';

  goToValentine() {
    this.currentScreen = 'valentine';
  }

  goToSuccess() {
    this.currentScreen = 'success';
  }
}
