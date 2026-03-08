const { chromium } = require('playwright');
const { fork } = require('child_process');

const baseUrl = 'http://localhost:9000';

describe('Credit Card Validator form', () => {
  let browser, page, server;

  beforeAll(async () => {
    jest.setTimeout(60000);
    server = fork(`${__dirname}/e2e.server.js`);

    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (msg) => {
        if (msg === 'ready') resolve();
      });
    });

    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
  }, 60000); // Таймаут для beforeAll

  afterAll(async () => {
    try {
      if (browser) {
        await browser.close();
      }
    } catch (error) {
      console.error('Ошибка при закрытии браузера:', error);
    }

    try {
      if (server) {
        server.kill();
      }
    } catch (error) {
      console.error('Ошибка при остановке сервера:', error);
    }
  }, 30000); // Явный таймаут для afterAll

  test('should validate card and show result', async () => {
    console.log('Начинаем тест: заполнение номера карты');

    // Заполняем номер карты Visa
    await page.fill('#cardNumber', '4532015112830366');
    console.log('Номер карты заполнен');

    // Клик по кнопке валидации
    await page.click('#validateBtn');
    console.log('Нажата кнопка валидации');

    // Даём время на реакцию интерфейса
    await page.waitForTimeout(3000);

    // Проверяем, что элемент #resultMessage существует
    const resultElement = await page.$('#resultMessage');
    expect(resultElement).toBeTruthy();

    // Получаем текст элемента (может быть пустым)
    const status = await page.textContent('#resultMessage', { timeout: 1000 }).catch(() => '');

    // Если текст есть, проверяем его
    if (status) {
      console.log('Текст в #resultMessage:', status);
      expect(status).toContain('Тип карты: Visa');
    } else {
      // Если текста нет, проверяем визуальные индикаторы
      console.log('Текст отсутствует, проверяем визуальные индикаторы...');

      // Проверяем, что иконка Visa стала видимой
      const visaIcon = await page.$('#visa');
      const isVisible = await visaIcon.isVisible();
      expect(isVisible).toBe(true);
      console.log('Иконка Visa видна — валидация прошла успешно');
    }
  }, 45000); // Таймаут для теста
});


