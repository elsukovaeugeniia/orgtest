import "./css/style.css";

// Алгоритм Luhn для проверки валидности номера карты
function luhnCheck(cardNumber) {
  let sum = 0;
  const numArray = cardNumber.split('').reverse();

  for (let i = 0; i < numArray.length; i++) {
    let digit = parseInt(numArray[i]);
    if (i % 2 === 1) { // Нечётные позиции (считая с 0)
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

// Определение платёжной системы по номеру карты
function getCardType(cardNumber) {
  const firstDigits = cardNumber.slice(0, 6);
  if (cardNumber.startsWith('4')) return 'visa';
  if (firstDigits >= '51' && firstDigits <= '55') return 'mastercard';
  if (cardNumber.startsWith('34') || cardNumber.startsWith('37')) return 'amex';
  if (cardNumber.startsWith('6011') || (cardNumber.startsWith('622') && cardNumber.slice(0, 6) <= '622925') || cardNumber.startsWith('644') || cardNumber.startsWith('65')) return 'discover';
  if (cardNumber.startsWith('35')) return 'jcb';
  if (cardNumber.startsWith('62') || cardNumber.startsWith('67')) return 'unionpay';
  return null;
}

// Сброс активных иконок
function resetIcons() {
  const icons = document.querySelectorAll('.card-icon');
  icons.forEach(icon => icon.classList.remove('active'));
}

// Основная логика виджета
document.getElementById('validateBtn').addEventListener('click', () => {
  const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
  const resultMessage = document.getElementById('resultMessage');

  if (cardNumber.length === 0) {
    resultMessage.textContent = 'Пожалуйста, введите номер карты';
    resultMessage.className = 'invalid';
    return;
  }

  resetIcons();

  const cardType = getCardType(cardNumber);
  if (cardType) {
    document.getElementById(cardType).classList.add('active');
  }

  const isValid = luhnCheck(cardNumber);
  if (isValid) {
    resultMessage.textContent = 'Номер карты валиден';
    resultMessage.className = 'valid';
  } else {
    resultMessage.textContent = 'Номер карты невалиден';
    resultMessage.className = 'invalid';
  }
});
