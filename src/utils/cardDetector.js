const PAYMENT_SYSTEMS = [
  {
    name: 'Visa',
    pattern: /^4/,
    length: [13, 16, 19],
    iconId: 'visa'
  },
  {
    name: 'Мир',
    pattern: /^220[0-4]/,
    length: [16],
    iconId: 'mir'
  },
  {
    name: 'UnionPay',
    pattern: /^62(?!22(12[6-9]|1[3-9][0-9]|[2-9][0-9]{2}))/,
    length: [16, 17, 18, 19],
    iconId: 'unionpay'
  },
  {
    name: 'Mastercard',
    pattern: /^(5[1-5]|2(?:2[2-9]|[3-6][0-9]|7[0-1]))/,
    length: [16],
    iconId: 'mastercard'
  },
  {
    name: 'American Express',
    pattern: /^(34|37)/,
    length: [15],
    iconId: 'amex'
  },
  {
    name: 'Discover',
    pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-9][0-9]{2})|64[4-9]|65)/,
    length: [16, 19],
    iconId: 'discover'
  },
  {
    name: 'JCB',
    pattern: /^35[2-8][0-9]/,
    length: [16, 19],
    iconId: 'jcb'
  }
];

export function detectCardType(cardNumber) {
  const cleanNumber = cardNumber.replace(/\D/g, '');
  if (!cleanNumber) return { type: 'Unknown', iconId: null };

  const length = cleanNumber.length;

  for (const system of PAYMENT_SYSTEMS) {
    if (system.length.includes(length) && system.pattern.test(cleanNumber)) {
      return {
        type: system.name,
        iconId: system.iconId
      };
    }
  }

  return { type: 'Unknown', iconId: null };
}

export function getCardType(cardNumber) {
  return detectCardType(cardNumber).type;
}
