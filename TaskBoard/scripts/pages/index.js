

// Função para mostrar a saudação com o nome do usuário
function mostrarBoasVindas() {
  const user = JSON.parse(localStorage.getItem('user')); // Recupera os dados do usuário do localStorage

  if (user) {
    const email = user.email; // Recupera o email do usuário
    const nomeUsuario = email.split('@')[0]; // Divide o email antes do "@" para pegar o nome
    const primeiroNome = nomeUsuario.split('.')[0]; // Se o nome tiver partes separadas por ponto (ex: "joao.silva"), pega apenas "joao"

    const saudacao = document.getElementById('nomeUser'); // Elemento onde será exibido o nome
    saudacao.textContent = `Olá, ${primeiroNome}!`; // Exibe o primeiro nome
  } else {
    console.log('Usuário não autenticado');
  }
}

// Chama a função para exibir as boas-vindas quando a página carregar
document.addEventListener('DOMContentLoaded', mostrarBoasVindas);


  