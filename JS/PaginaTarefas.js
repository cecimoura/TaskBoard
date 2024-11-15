const toggle = document.getElementById('toggle');
const body = document.body;

// Alterna entre as classes 'light' e 'dark' ao clicar no botão
toggle.addEventListener('change', () => {
  if (toggle.checked) {
    body.classList.remove('light');
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
    body.classList.add('light');
  }
});

// Define o tema padrão como claro
body.classList.add('light');