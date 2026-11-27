const showroomPhone = '+998911582211';
const form = document.querySelector('#order-form');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelectorAll('[data-product]').forEach((button) => {
  button.addEventListener('click', () => {
    const select = form.elements.product;
    const option = [...select.options].find((item) => item.value === button.dataset.product);
    if (option) select.value = option.value;
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const message = [
    'Assalomu alaykum! IMZO Rishton showroomiga buyurtma bermoqchiman.',
    `Ism: ${data.get('name')}`,
    `Telefon: ${data.get('phone')}`,
    `Mahsulot: ${data.get('product')}`,
    data.get('note') ? `Izoh: ${data.get('note')}` : ''
  ].filter(Boolean).join('\n');
  const telegramUrl = `https://t.me/${showroomPhone}?text=${encodeURIComponent(message)}`;
  window.open(telegramUrl, '_blank', 'noopener,noreferrer');
});

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));


