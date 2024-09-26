// Функція для отримання курсу валют
async function getExchangeRates(baseCurrency) {
    const apiKey = 'YOUR_API_KEY';  // Отримай API ключ від сервісу типу "ExchangeRate-API"
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}?apikey=${apiKey}`);
    return response.json();
  }
  
  // Функція для відображення конвертованої ціни
  function showConvertedPrice(element, basePrice) {
    getExchangeRates('USD').then(rates => {
      const priceInEUR = (basePrice * rates.rates.EUR).toFixed(2);
      const priceInUAH = (basePrice * rates.rates.UAH).toFixed(2);
  
      const tooltip = document.createElement('div');
      tooltip.className = 'price-tip';
      tooltip.innerHTML = `
        <div>EUR: ${priceInEUR}</div>
        <div>UAH: ${priceInUAH}</div>
      `;
      tooltip.style.position = 'absolute';
      tooltip.style.background = '#111';
      tooltip.style.color = '#fff';
      tooltip.style.padding = '5px';
      tooltip.style.borderRadius = '5px';
  
      element.appendChild(tooltip);
  
      // Позиціонування біля елемента
      element.addEventListener('mousemove', (e) => {
        tooltip.style.top = `${e.clientY + 10}px`;
        tooltip.style.left = `${e.clientX + 10}px`;
      });
  
      // Видалення підказки після відведення миші
      element.addEventListener('mouseleave', () => {
        tooltip.remove();
      });
    });
  }
  
  // Знаходження всіх цін на сторінці
  document.querySelectorAll('.price').forEach(priceElement => {
    const priceText = priceElement.textContent.trim();
    const basePrice = parseFloat(priceText.replace(/[^0-9.]/g, ''));
  
    priceElement.addEventListener('mouseenter', () => {
      showConvertedPrice(priceElement, basePrice);
    });
  });
  