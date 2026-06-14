const openGuideButton = document.getElementById('openGuideButton');
const closeGuideButton = document.getElementById('closeGuideButton');
const guideModal = document.getElementById('guideModal');
const copyLinkButton = document.getElementById('copyLinkButton');
const copyFeedback = document.getElementById('copyFeedback');
const declineButton = document.getElementById('declineButton');
const declineMessage = document.getElementById('declineMessage');

openGuideButton.addEventListener('click', () => {
  guideModal.hidden = false;
});

closeGuideButton.addEventListener('click', () => {
  guideModal.hidden = true;
});

guideModal.addEventListener('click', (event) => {
  if (event.target === guideModal) {
    guideModal.hidden = true;
  }
});

declineButton.addEventListener('click', () => {
  declineMessage.hidden = false;
});

copyLinkButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copyFeedback.textContent = 'Link copiado. Agora \u00e9 s\u00f3 colar no Google Chrome.';
  } catch {
    copyFeedback.textContent = 'N\u00e3o deu para copiar automaticamente. Copie o link pela barra do navegador.';
  }
});
