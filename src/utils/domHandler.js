import { validateLuhn } from '../utils/cardValidator.js';
import { detectCardType } from '../utils/cardDetector.js';

export class CardFormHandler {
  constructor() {
    this.cardInput = document.getElementById('card-number');
    this.statusElement = document.getElementById('status');
    this.logoElement = document.getElementById('logo');
    this.init();
  }

  init() {
    this.cardInput.addEventListener('input', (e) => this.handleInput(e));
  }

  handleInput(event) {
    const value = event.target.value;
    const isValid = validateLuhn(value);
    const cardType = detectCardType(value);

    this.updateUI(isValid, cardType);
  }

  updateUI(isValid, cardType) {
    this.statusElement.textContent = isValid ? 'Валидная карта' : 'Невалидный номер';
    this.statusElement.className = isValid ? 'valid' : 'invalid';
    this.logoElement.textContent = cardType !== 'Unknown' ? `${cardType} Logo` : '';
  }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  new CardFormHandler();
});
