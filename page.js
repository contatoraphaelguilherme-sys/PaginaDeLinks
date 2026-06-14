const openGuideButton = document.getElementById('openGuideButton');
const closeGuideButton = document.getElementById('closeGuideButton');
const guideModal = document.getElementById('guideModal');
const copyLinkButton = document.getElementById('copyLinkButton');
const copyFeedback = document.getElementById('copyFeedback');
const declineButton = document.getElementById('declineButton');
const declineMessage = document.getElementById('declineMessage');
const whatsappButton = document.getElementById('whatsappButton');
const telegramButton = document.getElementById('telegramButton');

function loadAnalytics() {
  const measurementId = window.LANDING_CONFIG?.gaMeasurementId?.trim();

  if (!measurementId || !/^G-[A-Z0-9]+$/i.test(measurementId)) {
    return null;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId);

  return measurementId;
}

loadAnalytics();

function trackEvent(eventName, params = {}) {
  if (typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', eventName, params);
}

openGuideButton.addEventListener('click', () => {
  trackEvent('landing_select_yes', {
    source: 'landing_page'
  });
  guideModal.hidden = false;
});

closeGuideButton.addEventListener('click', () => {
  trackEvent('landing_close_guide', {
    source: 'landing_page'
  });
  guideModal.hidden = true;
});

guideModal.addEventListener('click', (event) => {
  if (event.target === guideModal) {
    trackEvent('landing_close_guide', {
      source: 'backdrop'
    });
    guideModal.hidden = true;
  }
});

declineButton.addEventListener('click', () => {
  trackEvent('landing_select_no', {
    source: 'landing_page'
  });
  declineMessage.hidden = false;
});

copyLinkButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    trackEvent('landing_copy_link', {
      destination: 'browser'
    });
    copyFeedback.textContent = 'Link copiado. Agora \u00e9 s\u00f3 colar no Google Chrome.';
  } catch {
    copyFeedback.textContent = 'N\u00e3o deu para copiar automaticamente. Copie o link pela barra do navegador.';
  }
});

whatsappButton.addEventListener('click', () => {
  trackEvent('landing_click_whatsapp', {
    destination: 'whatsapp_channel'
  });
});

telegramButton.addEventListener('click', () => {
  trackEvent('landing_click_telegram', {
    destination: 'telegram_channel'
  });
});
