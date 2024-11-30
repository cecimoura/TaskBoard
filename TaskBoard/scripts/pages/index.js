// teste2.js

// Função para mostrar a saudação com o nome do usuário
function mostrarBoasVindas() {
    const user = JSON.parse(localStorage.getItem('user')); // Recupera os dados do usuário do localStorage
  
    if (user) {
      const saudacao = document.getElementById('nomeUser'); // Elemento onde será exibido o nome
      saudacao.textContent = `Olá, ${user.email}!`; // Exibe o email do usuário, ou use o nome, se disponível
    } else {
      console.log('Usuário não autenticado');
    }
  }
  
  // Chama a função para exibir as boas-vindas quando a página carregar
  document.addEventListener('DOMContentLoaded', mostrarBoasVindas);
  
  // Função de logout (para remover os dados do localStorage)
  function logout() {
    localStorage.removeItem('user'); // Remove os dados do usuário
    window.location.href = '/login'; // Redireciona para a página de login
  }
  
  // Exporta a função logout, caso precise usá-la em algum outro lugar
  export { logout };
  