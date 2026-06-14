const whatsappLink = '';

if (whatsappLink) {
  const button = document.getElementById('whatsappButton');
  button.href = whatsappLink;
  button.classList.remove('pending');
  button.removeAttribute('aria-disabled');
  button.querySelector('small').textContent = 'Entrar agora';
}
